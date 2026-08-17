// Minimal no-op stub for the Tracy profiler.
//
// The Ambient NPC Behavior Framework uses a small subset of Tracy macros purely
// for optional profiling. When the framework is compiled directly into the
// plugin module (rather than as a standalone profiled library), these macros are
// compiled out entirely.
#pragma once

#define ZoneScoped
#define ZoneScopedN(name)
#define ZoneScopedNC(name, color)
#define ZoneText(name, len) ((void)0)
#define ZoneValue(value) ((void)0)
#define FrameMark
#define FrameMarkStart(name)
#define FrameMarkEnd(name)
#define TracyMessage(msg, size) ((void)0)
#define TracyMessageL(msg) ((void)0)
#define TracyMessageC(msg, color, size) ((void)0)
#define TracyAlloc(ptr, size) ((void)0)
#define TracyFree(ptr) ((void)0)
#define TracyPlot(name, value) ((void)0)
