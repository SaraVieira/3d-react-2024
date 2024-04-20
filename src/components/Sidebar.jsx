import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

export const Sidebar = ({ results, onChange, onSelected }) => {
  return (
    <div className="w-[250px] shrink-0">
      <Input
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="mb-8"
        placeholder="Search for a game"
      />
      <ScrollArea className="h-[81vh]">
        {results.count !== 0 ? (
          <ul>
            {results?.hits?.map((game) => (
              <li className="cursor-pointer" key={game.id}>
                <Button
                  className="w-full justify-start overflow-clip truncate"
                  variant="ghost"
                  onClick={() => onSelected(game.document)}
                >
                  {game.document.title}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <span className="w-full text-center flex justify-center">
            No games found :(
          </span>
        )}
      </ScrollArea>
    </div>
  );
};
