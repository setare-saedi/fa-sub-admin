import Tags from "@yaireo/tagify/dist/react.tagify"; // React-wrapper file
import "@yaireo/tagify/dist/tagify.css"; // Tagify CSS


export default function Tagify({infos, changeHandler, title}) {

  const settings = {
    editTags: false,
    autoComplete: { enabled: true, rightKey: true },
    enforceWhitelist: {
      mixmode: false,
    },
    placeholder: title ,
    loadOriginalValues:(e) => {console.log(e,'orgin');},
    originalInputValueFormat: (items) => items.map((item) => item.id),
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
