//
//  Original implementation from https://github.com/facebook/Docusaurus
//
//  MIT License
//  Copyright (c) 2017-present, Facebook, Inc.

// Extract markdown metadata header
export default function (content) {
    const metadata = {};
    const both = splitHeader(content);
    if (Object.keys(both).length === 0) {
        return {
            metadata, content
        };
    }
    const lines = both.header.split('\n');
    for (let i = 0; i < lines.length - 1; ++i) {
        const keyvalue = lines[i].split(':');
        const key = keyvalue[0].trim();
        let value = keyvalue.slice(1)
            .join(':')
            .trim();
        try {
            value = JSON.parse(value);
        } catch (e) {
            // do nothing
        }
        metadata[key] = value;
    }
    return {
        metadata, content: both.content
    };
}


// split markdown header
function splitHeader(content) {
    // New line characters need to handle all operating systems.
    const lines = content.split(/\r?\n/);
    if (lines[0] !== '---') {
        return {};
    }
    let i = 1;
    for (; i < lines.length - 1; ++i) {
        if (lines[i] === '---') {
            break;
        }
    }
    return {
        header: lines.slice(1, i + 1).join('\n'),
        content: lines.slice(i + 1).join('\n'),
    };
}
