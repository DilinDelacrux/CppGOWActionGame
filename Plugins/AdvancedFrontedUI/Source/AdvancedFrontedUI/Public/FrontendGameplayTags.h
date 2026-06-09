// Vince Petrelli All Rights Reserved

#pragma once

#include "NativeGameplayTags.h"

namespace FrontendGameplayTags
{	
	//Frontend widget stack
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_WidgetStack_Modal);
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_WidgetStack_GameMenu);
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_WidgetStack_GameHud);
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_WidgetStack_Frontend);

	//Frontend widgets
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_Widget_PressAnyKeyScreen);
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_Widget_MainMenuScreen);
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_Widget_OptionsScreen);

	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_Widget_ConfirmScreen);

	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_Widget_KeyRemapScreen);

	//Frontend Options Image
	ADVANCEDFRONTEDUI_API UE_DECLARE_GAMEPLAY_TAG_EXTERN(Frontend_Image_TestImage);
}