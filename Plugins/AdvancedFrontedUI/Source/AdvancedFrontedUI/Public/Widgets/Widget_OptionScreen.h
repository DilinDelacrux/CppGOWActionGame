// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Widget_ActivatableBase.h"
#include "Widget_OptionScreen.generated.h"

/**
 * 
 */
UCLASS(Abstract, BlueprintType, meta = (DisableNaiveTick))
class ADVANCEDFRONTEDUI_API UWidget_OptionScreen : public UWidget_ActivatableBase
{
	
	GENERATED_BODY()
    protected:
    	//~ Begin UUserWidget Interface
    	virtual void NativeOnInitialized() override;
    	//~ End UUserWidget Interface
    
    	//~ Begin UCommonActivatableWidget Interface
    	// virtual void NativeOnActivated() override;
    	// virtual void NativeOnDeactivated() override; 
    	// virtual UWidget* NativeGetDesiredFocusTarget() const override;
    	//~ End UCommonActivatableWidget Interface
    
    private:
    
    	void OnResetBoundActionTriggered();
    	void OnBackBoundActionTriggered();
    
    	// UFUNCTION()
    	// void OnOptionsTabSelected(FName TabId);
     //
    	// void OnListViewItemHovered(UObject* InHoveredItem,bool bWasHovered);
    	// void OnListViewItemSelected(UObject* InSelectedItem);
     //
    	// FString TryGetEntryWidgetClassName(UObject* InOwningListItem) const;
    
    	UPROPERTY(EditDefaultsOnly, Category = "Frontend Options Screen", meta = (RowType = "/Script/CommonUI.CommonInputActionDataBase"))
    	FDataTableRowHandle ResetAction;
    
    	FUIActionBindingHandle ResetActionHandle;
    
    	bool bIsResettingData = false;
};
