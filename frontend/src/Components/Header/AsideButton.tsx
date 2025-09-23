export type AsideButtonProps = {
  toggleAside: () => void;
};

export function AsideButton({ toggleAside }: AsideButtonProps) {
  return (
    <div className="max-w-fit justify-start">
      <button className="bg-white text-black" onClick={() => toggleAside()}>
        III
      </button>
    </div>
  );
}
