#pragma once

namespace Debug
{
	static void Print(const FString &str,const FColor& color=FColor::MakeRandomColor(),int inKey=-1)
	{
		if(GEngine)
		{
			GEngine->AddOnScreenDebugMessage(inKey,7.f,color,str);
			UE_LOG(LogTemp,Warning,TEXT("%s"),*str);
		}
	}
}
