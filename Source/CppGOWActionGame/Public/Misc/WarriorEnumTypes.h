#pragma once


UENUM()
enum class EWarriorConfirmType:uint8
{
	YES,
	NO
};

UENUM()
enum class EWarriorValidType:uint8
{
	Valid,
	Invalid
};
UENUM()
enum class EWarriorSuccessType:uint8
{
	Successful,
	Failed
};
UENUM()
enum class EWarriorCountDownActionInput : uint8
{
	Start,
	Cancel
};

UENUM()
enum class EWarriorCountDownActionOutput : uint8
{
	Updated,
	Completed,
	Cancelled
};