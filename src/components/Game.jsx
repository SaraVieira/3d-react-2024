import { Canvas } from "@react-three/fiber";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Scene } from "./Scene";
import { Separator } from "./ui/separator";
import { OrbitControls, Stats } from "@react-three/drei";
import { BlendFunction } from "postprocessing";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Pixelation,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";

export const Game = ({ selected }) => {
  return (
    <div className="flex flex-col w-full pt-12 relative">
      <Canvas shadows>
        <OrbitControls
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
        />
        <Scene cover={selected.cover} />
        <EffectComposer>
          <Pixelation granularity={5} />
        </EffectComposer>
      </Canvas>
      <h1 className="font-bold text-xl mt-8">{selected.title}</h1>
      <div className="flex h-5 items-center space-x-4 text-sm mb-2">
        <div>{selected.developer}</div>
        <Separator orientation="vertical" />
        <div>{selected.publisher}</div>
        <Separator orientation="vertical" />
        <div>{selected.players}</div>
      </div>
      <small className="text-muted-foreground">
        {new Date(selected.dateReleased).toLocaleString("PT-pt", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </small>

      <div className="flex gap-2 mt-4">
        {selected.genre
          .split(" / ")
          .map((a) => a.trim())
          .map((g) => (
            <Badge key={g}>{g}</Badge>
          ))}
      </div>
      <p className="text-sm mt-4 leading-5 whitespace-pre-wrap">
        {selected.description.split("Manufacturer's description:")[0]}
      </p>
      <Button
        size="lg"
        className="fixed rounded-none bottom-0 w-full left-0 h-[60px]"
      >
        Play
      </Button>
    </div>
  );
};
