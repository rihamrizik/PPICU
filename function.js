window.function = function (html, fileName, format, zoom, orientation, margin, breakBefore, breakAfter, breakAvoid, fidelity, customDimensions) {
    // Fidelity Mapping
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2
    };

    // Dynamic Values with Defaults
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

    // Document Dimensions
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
        legal: [1276, 2102]
    };

    // Get Final Dimensions from Selected Format
    const dimensions = customDimensions || formatDimensions[format];
    const finalDimensions = dimensions.map((dimension) => Math.round(dimension / zoom));

    // Custom CSS
    const customCSS = `
        body { margin: 0 !important; }
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
        button#download.downloading { color: #ea580c; }
        button#download.done { color: #16a34a; }
        ::-webkit-scrollbar { width: 5px; background-color: rgb(0 0 0 / 8%); }
        ::-webkit-scrollbar-thumb { background-color: rgb(0 0 0 / 32%); border-radius: 4px; }
    `;

    // HTML for Renderable URL
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

                // Store original HTML to restore after download
                var originalContent = element.innerHTML;
                button.innerText = 'Generating...';
                button.className = 'generating';

                var opt = {
                    pagebreak: { 
                        mode: ['css'], 
                        before: ${JSON.stringify(breakBefore)}, 
                        after: ${JSON.stringify(breakAfter)}, 
                        avoid: ${JSON.stringify(breakAvoid)} 
                    },
                    margin: ${margin},
                    filename: '${fileName}',
                    html2canvas: { useCORS: true, scale: ${quality} },
                    jsPDF: { 
                        unit: 'px', 
                        orientation: '${orientation}', 
                        format: [${finalDimensions}], 
                        hotfixes: ['px_scaling'] 
                    }
                };

                html2pdf().set(opt).from(element).save().then(() => {
                    // Restore original content (simulating a soft refresh)
                    element.innerHTML = originalContent;

                    // Reattach event listeners to ensure button works after restoration
                    document.getElementById('download').addEventListener('click', arguments.callee);

                    button.innerText = 'Download';
                    button.className = ''; 
                });
            });
        </script>
    `;

    var encodedHtml = encodeURIComponent(originalHTML);
    return "data:text/html;charset=utf-8," + encodedHtml;
};
