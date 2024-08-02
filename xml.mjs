import { gi } from "./generic.mjs";

const xmlMimeType = "text/xml";

function processXml(xmlBody) {
    console.debug("loadXml!");
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlBody, xmlMimeType);
    fetch("backup.xsl")
        .then(response => response.text())
        .then(str => parser.parseFromString(str, xmlMimeType))
        .then(xslStr => {
            const processor = new XSLTProcessor();
            processor.importStylesheet(xslStr);
            const result = processor.transformToFragment(xml, document);
            gi("dropzone").classList.remove("expanded");
            gi("dropzone").classList.add("mini");
            gi("content").replaceChildren(result);
        })
}

export { processXml as loadXml };