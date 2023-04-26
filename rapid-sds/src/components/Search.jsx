import { memo, useCallback } from "react";

const Search = ({ onEnter, classNames }) => {
  const onSearch = useCallback(event => {
    if (event.key === 'Enter' && event.target.value !== "") {
      onEnter(event.target.value);
    }
  }, [onEnter]);

  return (
    <div className={`container-fluid form-group ${classNames}`}>
      <input
        type="text"
        className="form-control u-no-border search-box search-input u-font-white"
        placeholder="Search Company Name"
        onKeyDown={onSearch}
      />
    </div>
  );
}

export default memo(Search);
