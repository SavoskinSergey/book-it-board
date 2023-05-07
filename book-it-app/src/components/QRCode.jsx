import React from 'react';

import {QRCodeSVG} from 'qrcode.react';

function QRCodeComponent({ id }) {
  const text = `ID: ${id}`;
  return (
    // <QRCode value={text} />
    <QRCodeSVG value={text} />
  );
}

export default QRCodeComponent;