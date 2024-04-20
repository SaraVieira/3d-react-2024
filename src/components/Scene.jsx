import { ContactShadows, Stage } from "@react-three/drei";
import { Case } from "./Model";

export const Scene = ({ cover }) => {
  return (
    <>
      <Stage environment={"forest"} adjustCamera={1.5}>
        <Case cover={cover} />
      </Stage>
      <rectAreaLight
        args={["#e1a0d7", 10, 10]}
        intensity={1}
        position={[0, 2, -1]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </>
  );
};
