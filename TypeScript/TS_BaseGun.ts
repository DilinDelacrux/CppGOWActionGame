import * as UE from 'ue'
import {$ref, $unref} from 'puerts'

class TS_BaseGun extends UE.Actor {
    MaxBulletDistance: number=1000;
    Damage: number;
    FireRate: number;
    GunMesh: UE.StaticMeshComponent;
    PS_BulletImpact: UE.ParticleSystem;

    Constructor() {
        this.GunMesh = new UE.StaticMeshComponent(this, "GunMesh");
        this.RootComponent = this.GunMesh;
    }

    ReceiveBeginPlay(): void {
        this.PS_BulletImpact = UE.ParticleSystem.Load("/Game/BlockBreaker/ParticleSystems/PS_BulletImpact.PS_BulletImpact");
        this.GunMesh.SetCollisionEnabled(UE.ECollisionEnabled.NoCollision);
        this.MaxBulletDistance=3000;


    }

    //@no-blueprint
    Shoot(StartLocation: UE.Vector, EndLocation: UE.Vector): void {
        let hitResultOut = $ref<UE.HitResult>(undefined);

        if (UE.KismetSystemLibrary.LineTraceSingle(this, StartLocation, EndLocation, 0, false, undefined, 0, hitResultOut, true, undefined, undefined, 0)) {
            let hitResult = $unref(hitResultOut);
            UE.GameplayStatics.SpawnEmitterAtLocation(this, this.PS_BulletImpact, hitResult.Location, new UE.Rotator(0, 0, 0), new UE.Vector(1, 1, 1), true, UE.EPSCPoolMethod.AutoRelease, true);
            let hitActor = hitResult.GetActor();
            if (hitActor) {
                UE.GameplayStatics.ApplyDamage(hitActor, this.Damage, undefined, undefined, undefined);
            }
        }
    }
}

export default TS_BaseGun;
