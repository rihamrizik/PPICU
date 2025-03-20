window.function = function (html, fileName, format, zoom, orientation, margin, breakBefore, breakAfter, breakAvoid, fidelity, customDimensions) {
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
    customDimensions = customDimensions.value ? customDimensions.value.split(",").map(Number) : null;

    // DOCUMENT DIMENSIONS
    const formatDimensions = {
        a4: [1240, 1754],
        letter: [1276, 1648],
        legal: [1276, 2102],
    };

    // GET FINAL DIMENSIONS FROM SELECTED FORMAT
    const dimensions = customDimensions || formatDimensions[format];
    const finalDimensions = dimensions.map((dimension) => Math.round(dimension / zoom));

    // LOG SETTINGS TO CONSOLE
    console.log(
        `Filename: ${fileName}\n` +
        `Format: ${format}\n` +
        `Dimensions: ${dimensions}\n` +
        `Zoom: ${zoom}\n` +
        `Final Dimensions: ${finalDimensions}\n` +
        `Orientation: ${orientation}\n` +
        `Margin: ${margin}\n` +
        `Break before: ${breakBefore}\n` +
        `Break after: ${breakAfter}\n` +
        `Break avoid: ${breakAvoid}\n` +
        `Quality: ${quality}`
    );

    const customCSS = `
    body {
      margin: 0!important;
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
      box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06), 0 6px 12px -3px rgba(0, 0, 0, 0.1);
    }

    button#download.downloading {
      color: #ea580c;
    }

    button#download.done {
      color: #16a34a;
    }

    ::-webkit-scrollbar {
      width: 5px;
      background-color: rgb(0 0 0 / 8%);
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgb(0 0 0 / 32%);
      border-radius: 4px;
    }

    /* Ensure proper page breaks and prevent row splitting */
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-bottom: 20px; /* Added bottom margin */
    }

    th, td {
      border: 1px solid black;
      padding: 8px;
      text-align: left;
      white-space: nowrap; /* Prevent text wrapping */
    }

    tr {
      page-break-inside: avoid; /* Prevents row splitting */
    }

    .avoid-break {
      page-break-inside: avoid;
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
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('download').addEventListener('click', function() {
      var element = document.getElementById('content');
      var button = this;
      button.innerText = 'Downloading...';
      button.className = 'downloading';

      var opt = {
        margin: 10, /* Added margin */
        filename: '${fileName}.pdf',
        html2canvas: {
          useCORS: true,
          scale: 2
        },
        jsPDF: {
          unit: 'px',
          orientation: '${orientation}',
          format: '${format}',
          hotfixes: ['px_scaling']
        }
      };

      html2pdf().set(opt).from(element).toPdf().get('pdf').then(function(pdf) {
        button.innerText = 'Done 🎉';
        button.className = 'done';

        setTimeout(function() {
          location.reload();
        }, 2000);
      }).save();
    });
  });
</script>
      `;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
