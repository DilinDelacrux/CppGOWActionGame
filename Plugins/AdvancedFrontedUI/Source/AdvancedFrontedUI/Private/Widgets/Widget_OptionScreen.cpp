// Fill out your copyright notice in the Description page of Project Settings.


#include "Widgets/Widget_OptionScreen.h"
#include "Input/CommonUIInputTypes.h"
#include "ICommonInputModule.h"

void UWidget_OptionScreen::NativeOnInitialized()
{
	Super::NativeOnInitialized();

	if (!ResetAction.IsNull())
	{
		ResetActionHandle = RegisterUIActionBinding(
			FBindUIActionArgs(
				ResetAction,
				true,
				FSimpleDelegate::CreateUObject(this, &ThisClass::OnResetBoundActionTriggered)
			)
		);
	}
	
	RegisterUIActionBinding(
		FBindUIActionArgs(
			ICommonInputModule::GetSettings().GetDefaultBackAction(),
			true,
			FSimpleDelegate::CreateUObject(this,&ThisClass::OnBackBoundActionTriggered)
		)
	);


	
}

void UWidget_OptionScreen::OnResetBoundActionTriggered()
{
	// if (ResettableDataArray.IsEmpty())
	// {
	// 	return;
	// }
	//
	// UCommonButtonBase* SelectedTabButton = TabListWidget_OptionsTabs->GetTabButtonBaseByID(TabListWidget_OptionsTabs->GetActiveTab());
	//
	// const FString SelectedTabButtonName = CastChecked<UFrontendCommonButtonBase>(SelectedTabButton)->GetButtonDisplayText().ToString();
	//
	// UFrontendUISubsystem::Get(this)->PushConfirmScreenToModalStackAynsc(
	// 	EConfirmScreenType::YesNo,
	// 	FText::FromString(TEXT("Reset")),
	// 	FText::FromString(TEXT("Are you sure you want to reset all the settings under the ") + SelectedTabButtonName + TEXT(" tab?")),
	// 	[this](EConfirmScreenButtonType ClickedButtonType)
	// 	{
	// 		if (ClickedButtonType != EConfirmScreenButtonType::Confirmed)
	// 		{
	// 			return;
	// 		}
	//
	// 		bIsResettingData = true;
	// 		bool bHasDataFailedToReset = false;
	//
	// 		for (UListDataObject_Base* DataToReset : ResettableDataArray)
	// 		{
	// 			if (!DataToReset)
	// 			{
	// 				continue;
	// 			}
	//
	// 			if (DataToReset->TryResetBackToDefaultValue())
	// 			{
	// 				Debug::Print(DataToReset->GetDataDisplayName().ToString() + TEXT(" was reset"));
	// 			}
	// 			else
	// 			{
	// 				bHasDataFailedToReset = true;
	// 				Debug::Print(DataToReset->GetDataDisplayName().ToString() + TEXT(" failed to reset"));
	// 			}
	// 		}
	//
	// 		if (!bHasDataFailedToReset)
	// 		{
	// 			ResettableDataArray.Empty();
	// 			RemoveActionBinding(ResetActionHandle);
	// 		}
	//
	// 		bIsResettingData = false;
	// 	}
	// );
}

void UWidget_OptionScreen::OnBackBoundActionTriggered()
{
	DeactivateWidget();
}
