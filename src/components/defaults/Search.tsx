import { Hamburger, SearchIcon } from "../icons";

const Search = () => {
  return (
    <div className="mt-2 flex items-center px-2 justify-between border border-[#ccc] rounded-md shadow-md py-2">
      <div className="flex items-center w-[90%] space-x-3">
        <SearchIcon />
        <input
          type="text"
          className="bg-inherit outline-none border-none text-[14px] w-[100%]"
          placeholder="search for your favorite bread today"
        />
      </div>
      <Hamburger />
    </div>
  );
};

export default Search;
