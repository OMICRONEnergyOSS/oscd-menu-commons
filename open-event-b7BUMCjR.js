function newOpenEvent(doc, docName) {
    return new CustomEvent('oscd-open', {
        bubbles: true,
        composed: true,
        detail: { doc, docName },
    });
}

export { newOpenEvent as n };
//# sourceMappingURL=open-event-b7BUMCjR.js.map
