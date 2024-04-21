import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { MeshPhysicalMaterial } from "three";
import { useFrame } from "@react-three/fiber";

export function Case(props) {
  const { nodes, materials } = useGLTF("/psx.glb");
  const texture = useTexture(props.cover);
  const coverMaterial = new MeshPhysicalMaterial({
    map: texture,
  });
  const gameCase = useRef();
  useFrame(({ clock }) => {
    if (gameCase.current) {
      gameCase.current.rotation.y = clock.getElapsedTime() / 2;
    }
  });
  return (
    <group {...props} dispose={null} ref={gameCase}>
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
