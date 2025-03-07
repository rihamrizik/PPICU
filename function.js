window.function = function (
  html,
  fileName,
  format,
  zoom,
  orientation,
  margin,
  breakBefore,
  breakAfter,
  breakAvoid,
  fidelity,
  customDimensions
) {
  // FIDELITY MAPPING
  const fidelityMap = {
    low: 1,
    standard: 1.5,
    high: 2,
  };

  // DYNAMIC VALUES
  html = html.value ?? "No HTML set.";
  fileName = fileName.value ?? "file";
  format = format.value ?? "a4";
  zoom = zoom.value ?? "1";
  orientation = orientation.value ?? "portrait";
  margin = margin.value ?? "0";
  breakBefore = breakBefore.value ? breakBefore.value.split(",") : [];
  breakAfter = breakAfter.value ? breakAfter.value.split(",") : [];
  breakAvoid = breakAvoid.value ? breakAvoid.value.split(",") : [];
  quality = fidelityMap[fidelity.value] ?? 1.5;
  customDimensions = customDimensions.value
    ? customDimensions.value.split(",").map(Number)
    : null;

  // DOCUMENT DIMENSIONS
  const formatDimensions = {
    a0: [4967, 7022],
    a1: [3508, 4967],
    a2: [2480, 3508],
    a3: [1754, 2480],
    a4: [1240, 1754],
    a5: [874, 1240],
    a6: [620, 874],
    a7: [437, 620],
    a8: [307, 437],
    a9: [219, 307],
    a10: [154, 219],
    letter: [1276, 1648],
    legal: [1276, 2102],
  };

  // GET FINAL DIMENSIONS FROM SELECTED FORMAT
  const dimensions = customDimensions || formatDimensions[format];
  const finalDimensions = dimensions.map((dimension) =>
    Math.round(dimension / zoom)
  );

  const customCSS = `
    body {
      margin: 0!important
    }
    button#download {
      position: fixed;
      border-radius: 0.5rem;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.5rem;
      color: #0d0d0d;
      border: none;
      font-family: 'Inter';
      padding: 0px 12px;
      height: 32px;
      background: #ffffff;
      top: 8px;
      right: 8px;
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 2.5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }
    button#download:hover {
      background: #f5f5f5;
    }
  `;

  // HTML THAT IS RETURNED AS A RENDERABLE URL
  const originalHTML = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    <style>${customCSS}</style>
    <div class="main">
      <div class="header">
        <button class="button" id="download">Download</button>
      </div>
      <div id="content">${html}</div>
    </div>
    <script>
      document.getElementById('download').addEventListener('click', function() {
        var element = document.getElementById('content');
        var button = this;
        button.innerText = 'Downloading...';
        button.className = 'downloading';

        // Clear Cache Before Generating
        caches.keys().then(names => {
          for (let name of names) caches.delete(name);
        }).then(() => {
          var opt = {
            pagebreak: { 
              mode: ['css'], 
              before: ${JSON.stringify(breakBefore)}, 
              after: ${JSON.stringify(breakAfter)}, 
              avoid: ${JSON.stringify(breakAvoid)} 
            },
            margin: ${margin},
            filename: '${fileName}',
            html2canvas: {
              useCORS: true,
              scale: ${quality}
            },
            jsPDF: {
              unit: 'px',
              orientation: '${orientation}',
              format: [${finalDimensions}],
              hotfixes: ['px_scaling']
            }
          };
          
          // Generate PDF and Open in New Tab
          html2pdf().set(opt).from(element).toPdf().output('blob').then(function(pdfBlob) {
            var blobUrl = URL.createObjectURL(pdfBlob);
            window.open(blobUrl, '_blank');
            button.innerText = 'Done 🎉';
            button.className = 'done';
            setTimeout(function() { 
              button.innerText = 'Download';
              button.className = ''; 
            }, 2000);
          });
        });
      });
    </script>
  `;

  var encodedHtml = encodeURIComponent(originalHTML);
  return "data:text/html;charset=utf-8," + encodedHtml;
};
