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
        b0: [5906, 8350],
        b1: [4175, 5906],
        b2: [2953, 4175],
        b3: [2085, 2953],
        b4: [1476, 2085],
        b5: [1039, 1476],
        b6: [738, 1039],
        b7: [520, 738],
        b8: [366, 520],
        b9: [260, 366],
        b10: [183, 260],
        c0: [5415, 7659],
        c1: [3827, 5415],
        c2: [2705, 3827],
        c3: [1913, 2705],
        c4: [1352, 1913],
        c5: [957, 1352],
        c6: [673, 957],
        c7: [478, 673],
        c8: [337, 478],
        c9: [236, 337],
        c10: [165, 236],
        dl: [650, 1299],
        letter: [1276, 1648],
        government_letter: [1199, 1577],
        legal: [1276, 2102],
        junior_legal: [1199, 750],
        ledger: [2551, 1648],
        tabloid: [1648, 2551],
        credit_card: [319, 508],
    };

    // GET FINAL DIMESIONS FROM SELECTED FORMAT
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

    // CREATE A TEMPORARY DIV TO HOLD THE HTML CONTENT
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // GENERATE PDF DIRECTLY
    const opt = {
        margin: parseFloat(margin),
        filename: `${fileName}.pdf`,
        html2canvas: {
            useCORS: true,
            scale: quality,
        },
        jsPDF: {
            unit: "px",
            orientation: orientation,
            format: format,
            hotfixes: ["px_scaling"],
        },
    };

    // USE html2pdf.js TO GENERATE AND DOWNLOAD THE PDF
    html2pdf()
        .set(opt)
        .from(tempDiv)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
            pdf.save(`${fileName}.pdf`);
        });

    // RETURN A DUMMY VALUE (NOT USED)
    return "PDF generation initiated.";
};
