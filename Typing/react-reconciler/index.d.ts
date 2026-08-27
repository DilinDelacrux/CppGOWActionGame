declare module 'react-reconciler' {
    namespace Reconciler {
        type HostConfig<
            Type,
            Props,
            Container,
            Instance,
            TextInstance,
            SuspenseInstance,
            HydratableInstance,
            PublicInstance,
            HostContext,
            UpdatePayload,
            ChildSet,
            TimeoutHandle
        > = Record<string, unknown>

        type Instance = {
            createContainer(...args: unknown[]): unknown
            updateContainer(...args: unknown[]): void
        }
    }

    function Reconciler(hostConfig: Record<string, unknown>): Reconciler.Instance

    export = Reconciler
}
