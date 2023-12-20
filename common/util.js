const hexToRgba = (hex, opacity) => { // 十六进制颜色转rgba
	return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" +
		hex.slice(5, 7)) + "," + opacity + ")"
}

module.exports = {
	hexToRgba, // 十六进制颜色转rgba
}