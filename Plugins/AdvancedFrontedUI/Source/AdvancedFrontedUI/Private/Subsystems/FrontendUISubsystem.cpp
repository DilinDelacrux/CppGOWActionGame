// Fill out your copyright notice in the Description page of Project Settings.


#include "Subsystems/FrontendUISubsystem.h"
#include "Widgets/CommonActivatableWidgetContainer.h"

#include "Engine/AssetManager.h"

UFrontendUISubsystem* UFrontendUISubsystem::Get(const UObject* WorldContextObject)
{
	if (GEngine)
	{
		UWorld* World = GEngine->GetWorldFromContextObject(WorldContextObject,EGetWorldErrorMode::Assert);

		return UGameInstance::GetSubsystem<UFrontendUISubsystem>(World->GetGameInstance());
	}

	return nullptr;
}

bool UFrontendUISubsystem::ShouldCreateSubsystem(UObject* Outer) const
{
	if (!CastChecked<UGameInstance>(Outer)->IsDedicatedServerInstance())
	{	
		TArray<UClass*> FoundClasses;
		GetDerivedClasses(GetClass(),FoundClasses);

		return FoundClasses.IsEmpty();
	}

	return false;
}

void UFrontendUISubsystem::PushSoftWidgetToStackAsync(const FGameplayTag& InWidgetStackTag,
	TSoftClassPtr<UWidget_ActivatableBase> InSoftWidgetClass,
	TFunction<void(EAsyncPushWidgetState, UWidget_ActivatableBase*)> AsyncPushStateCallback)
{
	// 1. 安全检查：确保传进来的软引用路径不是空的，如果是空的直接崩溃报错（开发阶段排错）
	check(!InSoftWidgetClass.IsNull());

	// 2. 调用虚幻引擎的资源管理器（AssetManager），发起异步加载请求

	UAssetManager::Get().GetStreamableManager().RequestAsyncLoad(
		InSoftWidgetClass.ToSoftObjectPath(),// 将软指针转为具体的资源路径
		FStreamableDelegate::CreateLambda( // 创建一个 Lambda 表达式（匿名函数），作为加载完成后的回调
			[InSoftWidgetClass,this,InWidgetStackTag,AsyncPushStateCallback]()
			{
				// 1. 从软指针中获取已经加载完成的真正的 C++ UClass 类
					UClass* LoadedWidgetClass = InSoftWidgetClass.Get();
    
					// 2. 检查：确保类加载成功，且主 UI 布局（CreatedPrimaryLayout）已经初始化完毕
					check(LoadedWidgetClass && CreatedPrimaryLayout);

					// 3. 寻找 UI 容器：根据标签（如 UI.Layer.Menu）找到对应的 UI 栈容器
					UCommonActivatableWidgetContainerBase* FoundWidgetStack = CreatedPrimaryLayout->FindWidgetStackByTag(InWidgetStackTag);

					// 4. 生成 UI 并推入栈
					UWidget_ActivatableBase* CreatedWidget = FoundWidgetStack->AddWidget<UWidget_ActivatableBase>(LoadedWidgetClass,
						// 第二层内层 Lambda 开始
						[AsyncPushStateCallback](UWidget_ActivatableBase& CreatedWidgetInstance)
						{
						   // 状态一：UI 实例刚创建好，但还没正式推入显示栈
						   AsyncPushStateCallback(EAsyncPushWidgetState::OnCreatedBeforePush, &CreatedWidgetInstance);
						}
					);

					// 5. 状态二：整个 UI 已经成功推入栈，流程结束
					AsyncPushStateCallback(EAsyncPushWidgetState::AfterPush, CreatedWidget);
			}
		)
	);
}

void UFrontendUISubsystem::RegisterCreatedPrimaryLayoutWidget(UWidget_PrimaryLayout* InCreatedWidget)
{
	check(InCreatedWidget);

	CreatedPrimaryLayout = InCreatedWidget;
}
