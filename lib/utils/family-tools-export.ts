/**
 * FAMILY TOOLS EXPORT - EXPORTAÇÃO DE GENOGRAMA E ECOMAPA
 * ========================================================
 * 
 * Utilitários para exportar Genograma e Ecomapa como imagens (SVG/PNG)
 * para inclusão em SOAP notes
 */

/**
 * Converte SVG string para base64 data URL
 */
export function svgToDataURL(svgString: string): string {
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

/**
 * Converte React Flow para PNG usando html2canvas
 */
export async function reactFlowToPNG(
  reactFlowElement: HTMLElement,
  options: {
    backgroundColor?: string;
    quality?: number;
  } = {}
): Promise<string> {
  const html2canvas = (await import('html2canvas')).default;
  
  const canvas = await html2canvas(reactFlowElement, {
    backgroundColor: options.backgroundColor || '#ffffff',
    scale: 2, // Maior qualidade
    useCORS: true,
    logging: false,
    width: reactFlowElement.scrollWidth,
    height: reactFlowElement.scrollHeight,
  });

  return canvas.toDataURL('image/png', options.quality || 0.95);
}

/**
 * Converte SVG para PNG usando canvas
 */
export async function svgToPNG(svgString: string, width: number = 1200, height: number = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG'));
    };

    img.src = url;
  });
}

/**
 * Download de SVG como arquivo
 */
export function downloadSVG(svgString: string, filename: string = 'genograma.svg'): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download de PNG como arquivo
 */
export function downloadPNG(dataURL: string, filename: string = 'genograma.png'): void {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Obtém SVG do elemento React Flow
 */
export function getReactFlowSVG(
  nodes: any[],
  edges: any[],
  options: {
    width?: number;
    height?: number;
    backgroundColor?: string;
  } = {}
): string {
  const { width = 1200, height = 800, backgroundColor = 'white' } = options;

  // Converter nós e arestas para SVG
  const nodeElements = nodes.map(node => {
    const x = node.position?.x || 0;
    const y = node.position?.y || 0;
    const nodeWidth = node.width || 100;
    const nodeHeight = node.height || 50;

    // Forma básica (círculo ou quadrado dependendo do tipo)
    let shape = '';
    if (node.type === 'person' || node.data?.sexo === 'feminino') {
      shape = `<circle cx="${x + nodeWidth / 2}" cy="${y + nodeHeight / 2}" r="${nodeHeight / 2}" fill="white" stroke="black" stroke-width="2"/>`;
    } else {
      shape = `<rect x="${x}" y="${y}" width="${nodeWidth}" height="${nodeHeight}" fill="white" stroke="black" stroke-width="2"/>`;
    }

    // Texto
    const text = node.data?.nome || node.id;
    const textY = y + nodeHeight / 2;
    const fontSize = 12;

    return `${shape}<text x="${x + nodeWidth / 2}" y="${textY}" text-anchor="middle" font-size="${fontSize}" font-family="Arial">${text}</text>`;
  }).join('\n');

  const edgeElements = edges.map(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    if (!sourceNode || !targetNode) return '';

    const x1 = (sourceNode.position?.x || 0) + (sourceNode.width || 100) / 2;
    const y1 = (sourceNode.position?.y || 0) + (sourceNode.height || 50) / 2;
    const x2 = (targetNode.position?.x || 0) + (targetNode.width || 100) / 2;
    const y2 = (targetNode.position?.y || 0) + (targetNode.height || 50) / 2;

    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2"/>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}"/>
  ${edgeElements}
  ${nodeElements}
</svg>`;
}

/**
 * Exporta React Flow como SVG string
 */
export async function exportReactFlowToSVG(
  reactFlowInstance: any,
  options: {
    backgroundColor?: string;
    includeBackground?: boolean;
  } = {}
): Promise<string> {
  if (!reactFlowInstance) {
    throw new Error('React Flow instance not available');
  }

  // Obter viewport
  const viewport = reactFlowInstance.getViewport();
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();

  // Calcular bounding box
  const minX = Math.min(...nodes.map((n: any) => (n.position?.x || 0)));
  const minY = Math.min(...nodes.map((n: any) => (n.position?.y || 0)));
  const maxX = Math.max(...nodes.map((n: any) => (n.position?.x || 0) + (n.width || 100)));
  const maxY = Math.max(...nodes.map((n: any) => (n.position?.y || 0) + (n.height || 50)));

  const padding = 50;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;

  return getReactFlowSVG(nodes, edges, {
    width,
    height,
    backgroundColor: options.backgroundColor || 'white',
  });
}

/**
 * Compressa imagem base64 para uso em PDF
 */
export function compressImageForPDF(dataURL: string, quality: number = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Redimensionar se muito grande (max 1200px)
      let { width, height } = img;
      const maxDimension = 1200;
      
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataURL;
  });
}

