// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "FrontendType/FrontendEnumType.h"
#include "Subsystems/GameInstanceSubsystem.h"
#include "Widgets/Widget_ActivatableBase.h"
#include "Widgets/Widget_PrimaryLayout.h"
#include "FrontendUISubsystem.generated.h"

enum class EAsyncPushWidgetState : uint8
{
	OnCreatedBeforePush,
	AfterPush
};

DECLARE_DYNAMIC_MULTICAST_DELEGATE_TwoParams(FOnButtonDescriptionTextUpdatedDelegate,UFrontendCommonButtonBase*,BroadcastingButton,FText,DescriptionText);


UCLASS()
class ADVANCEDFRONTEDUI_API UFrontendUISubsystem : public UGameInstanceSubsystem
{
	GENERATED_BODY()
	
public:
	static UFrontendUISubsystem* Get(const UObject* WorldContextObject);
	
	virtual bool ShouldCreateSubsystem(UObject* Outer) const override;
	
	void PushSoftWidgetToStackAsync(const FGameplayTag& InWidgetStackTag,
		TSoftClassPtr<UWidget_ActivatableBase> InSoftWidgetClass,
		TFunction<void(EAsyncPushWidgetState,
		UWidget_ActivatableBase*)> AsyncPushStateCallback);
	
	void PushConfirmScreenToModalStackAsync(EConfirmScreenType InScreenType,
		const FText& InScreenTitle,const FText& InScreenMsg,TFunction<void(EConfirmScreenButtonType)> ButtonClickedCallback);
	
	UFUNCTION(BlueprintCallable)
	void RegisterCreatedPrimaryLayoutWidget(UWidget_PrimaryLayout* InCreatedWidget);

	UPROPERTY(BlueprintAssignable)
	FOnButtonDescriptionTextUpdatedDelegate OnButtonDescriptionTextUpdated;
private:
	UPROPERTY(Transient)
	UWidget_PrimaryLayout* CreatedPrimaryLayout;
};
