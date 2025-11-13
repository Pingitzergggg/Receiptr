import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PdfViewerProps {
  fileUrl: string;
  scrollable: boolean
}

export default function PdfViewer({ fileUrl, scrollable }: PdfViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const renderPdf = async () => {
      let currentPage : number = 1;
      let pageUpperLimit : number = NaN;
      const pdf = await pdfjsLib.getDocument(fileUrl).promise;
      let page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: .5 });
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context!, viewport, canvas: canvasRef.current! }).promise;

      const pageChanger = async () => {
        try {
            if (isNaN(pageUpperLimit)) {
                page = await pdf.getPage(currentPage);
            } else {
                if (currentPage <= pageUpperLimit) {
                    page = await pdf.getPage(currentPage);
                } else {
                    currentPage = pageUpperLimit;
                }
            }
        } catch {
            pageUpperLimit = currentPage - 1;
            currentPage = pageUpperLimit;
            console.error('Pdf.js: PDF page is out of bounds!');
        } finally {
            await page.render({canvasContext: context!, viewport, canvas: canvasRef.current!});
        }
      }

      const scrollControl = (e: { deltaY: number; }) => {
        if (e.deltaY < 0) {
            currentPage = currentPage == 1 ? currentPage : currentPage - 1;
            pageChanger();
        } else {
            currentPage++;
            pageChanger();
        }
      }
      
      if (scrollable) { //Scrolling doesnt work properly when loading in multiple documents -- DONT USE
            canvas.addEventListener('wheel', scrollControl);
      }
    };

    renderPdf().catch(console.error);
  }, [fileUrl]);

  return (
    <canvas style={{borderRadius: '15px'}} ref={canvasRef}></canvas>
  );
}