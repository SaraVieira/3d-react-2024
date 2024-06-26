import { ContactShadows, OrbitControls, Stage } from "@react-three/drei";
import { Case } from "./Model";
import { FPSLimiter } from "./FPSLimit";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";

export const Scene = ({ cover }) => {
  return (
    <>
      <Stage environment={"forest"} adjustCamera={1.44} shadows={false}>
        <Case cover={cover} />
      </Stage>
      <ContactShadows position={[0, -0.7, 0]} opacity={0.5} />
      <rectAreaLight
        args={["#ffffff", 10, 10]}
        intensity={1}
        position={[0, 2, -1]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <FPSLimiter fps={30} />
      <OrbitControls />
      <EffectComposer>
        <Pixelation granularity={5} />
      </EffectComposer>
    </>
  );
};
