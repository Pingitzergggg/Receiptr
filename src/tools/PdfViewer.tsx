import { useEffect, useRef, useState, type ReactElement, type RefObject } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfViewerProps {
  fileUrl: string;
}

function PdfViewer({ fileUrl }: PdfViewerProps) {
  const output: RefObject<ReactElement[]> = useRef([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  function Page({pdf, page}: {pdf: pdfjsLib.PDFDocumentProxy, page: number}): ReactElement {
    const canvasRef: RefObject<HTMLCanvasElement|null> = useRef(null);
    
    useEffect(() => {
      async function renderPage() {
        let pageUpperLimit: number = pdf.numPages;
        if (page > pageUpperLimit) {
          console.error("Pdf.js: Page cursor overflow!");
          return;
        }
        let doc = await pdf.getPage(page);

        const viewport = doc.getViewport({ scale: 2 });
        const canvas = canvasRef.current;
        if (!canvas) {
          console.error("Pdf.js: There is no canvas to use!");
          return;
        }
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await doc.render({ canvasContext: context!, viewport, canvas: canvasRef.current! }).promise;
      }

      renderPage();
    }, []);

    return <div className="w-full mb-5">
      <canvas className="h-[60vh] md:h-[80vh] w-[100%]" ref={canvasRef}></canvas>
    </div>;
  }

  useEffect(() => {
    async function renderPdf() {
      const pdf = await pdfjsLib.getDocument(fileUrl).promise;
      for (let i: number = 1; i <= pdf.numPages; ++i) {
        console.log(i);
        output.current.push(await <Page page={i} pdf={pdf} />)
      }
      console.log(output.current);
    }

    renderPdf().then(() => {
      if (output.current.length != 0) {
        setLoaded(true);
      }
    }).catch(console.error);
  }, [fileUrl]);

  let Element: ReactElement[] = [];
  if (loaded) {
    Element = output.current;
  }

  return Element;
}

export default PdfViewer;