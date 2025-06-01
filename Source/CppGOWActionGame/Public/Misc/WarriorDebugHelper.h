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
	static void Print(const FString &FloatTitle,float FloatValueToPrint, const FColor& color=FColor::MakeRandomColor(),int inKey=-1)
	{
		if(GEngine)
		{
			const FString Msg = FloatTitle+TEXT(":")+FString::SanitizeFloat(FloatValueToPrint);
			GEngine->AddOnScreenDebugMessage(inKey,7.f,color,Msg);
			UE_LOG(LogTemp,Warning,TEXT("%s"),*Msg);
		}
	}
}
