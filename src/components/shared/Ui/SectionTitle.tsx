const SectionTitle = ({ text }: { text: string }) => {
  return (
    <h2
      className="relative pl-10 text-2xl font-bold uppercase text-black 
            before:content-[''] before:absolute before:left-1 before:bottom-2 
            before:h-5 before:w-[15px] 
            before:border-l-[5px] before:border-r-[5px] before:border-primary 
            before:transform before:-skew-x-[26deg]"
    >
      {text}
    </h2>
  );
};

export default SectionTitle;
