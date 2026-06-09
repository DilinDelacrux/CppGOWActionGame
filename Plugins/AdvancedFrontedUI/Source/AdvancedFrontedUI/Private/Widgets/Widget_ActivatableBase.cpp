#include "Widgets/Widget_ActivatableBase.h"
#include "FrontendPlayerController.h"


AFrontendPlayerController* UWidget_ActivatableBase::GetOwningFrontendPlayerController()
{
	if (!CachedOwningFrontendPC.IsValid())
	{
		CachedOwningFrontendPC = GetOwningPlayer<AFrontendPlayerController>();
	}

	return CachedOwningFrontendPC.IsValid()? CachedOwningFrontendPC.Get() : nullptr;
}
