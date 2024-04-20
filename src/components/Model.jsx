import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshPhysicalMaterial, TextureLoader } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

function FPSLimiter({ fps }) {
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const advance = useThree((state) => state.advance);
  const frameloop = useThree((state) => state.frameloop);

  useLayoutEffect(() => {
    const initFrameloop = get().frameloop;

    return () => {
      set({ frameloop: initFrameloop });
    };
  }, []);

  useFrame((state) => {
    if (state.get().blocked) return;
    state.set({ blocked: true });

    setTimeout(() => {
      state.set({ blocked: false });

      state.advance();
    }, Math.max(0, 1000 / fps - state.clock.getDelta()));
  });

  useEffect(() => {
    if (frameloop !== "never") {
      set({ frameloop: "never" });
      advance();
    }
  }, [frameloop]);

  return null;
}

export function Case(props) {
  const { nodes, materials } = useGLTF("/psx.glb");
  const texture = useLoader(TextureLoader, props.cover);
  const coverMaterial = new MeshPhysicalMaterial({
    map: texture,
  });
  const a = useRef();
  useFrame(({ clock }) => {
    if (a.current) {
      a.current.rotation.y = clock.getElapsedTime() / 2;
    }
  });
  return (
    <group {...props} dispose={null} ref={a}>
      <FPSLimiter fps={10} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoverImage.geometry}
        material={coverMaterial}
        position={[0, 0, -0.001]}
        rotation={[0, 0, Math.PI / 2]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.INNER.geometry}
        material={materials.Material}
        position={[0, -0.003, 0.007]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["5521_playstation-one-psx-prev"].geometry}
        material={materials["5521_playstation-one-psx-prev.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["5521_playstation-one-psx-prev_1"].geometry}
        material={materials["5521_playstation-one-psx-prev.002"]}
      />
      <lineSegments
        geometry={nodes["5521_playstation-one-psx-prev_2"].geometry}
        material={materials["5521_playstation-one-psx-prev.001"]}
      />
    </group>
  );
}

useGLTF.preload("/psx.glb");
