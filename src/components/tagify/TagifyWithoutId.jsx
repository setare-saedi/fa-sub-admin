import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS

export default function TagifyWithoutId({infos, changeHandler, title}) {

  const settings = {
    editTags: false,
    autoComplete: { enabled: true, rightKey: true },
    enforceWhitelist: {
      mixmode: false,
    },
    placeholder: title ,
    originalInputValueFormat: (items) => items.map((item) => item.value ),
    dropdown: {
      highlightFirst: true,
      fuzzySearch: false,
      enabled: 0,
      placeAbove: false,
    
    },
  };
 
  return (
    <>
      <div>
        <Tags
          whitelist={infos}
          settings={settings}
          onChange={(e)=>changeHandler(e)}
        />
      </div>
    </>
  );
}
