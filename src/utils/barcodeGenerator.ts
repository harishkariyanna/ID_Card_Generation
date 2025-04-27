import JsBarcode from 'jsbarcode';

/**
 * Generates a Code128 barcode SVG from a given value
 */
export const generateBarcodeSVG = (value: string): string => {
  if (!value) return '';
  
  // Create a temporary SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  
  // Generate barcode using JsBarcode
  JsBarcode(svg, value, {
    format: 'CODE128',
    width: 2,
    height: 50,
    displayValue: true,
    fontSize: 12,
    margin: 5,
  });
  
  // Return the SVG as a string
  return svg.outerHTML;
};

/**
 * Converts a barcode SVG to a data URL for image embedding
 */
export const svgToDataUrl = (svg: string): string => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};