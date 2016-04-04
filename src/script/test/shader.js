var shaderTest = {

	vertexShader: [

		"void main() {",

		"gl_Position = projectionMatrix *",
		"modelViewMatrix *",
		"vec4(position,1.0);",
		"}"


	].join("\n"),

	fragmentShader: [

		"void main() {",
		"gl_FragColor = vec4(1.0,  // R",
		"1.0,  // G",
		"1.0,  // B",
		"1.0); // A",
		"}"

	].join("\n")
	,
	vertexShaderLight:[
	// switch on high precision floats
	"#ifdef GL_ES",
	"precision highp float;",
	"#endif",

	"uniform float amplitude;",
	"attribute float displacement;",
	"varying vec3 vNormal;",

	"void main() {",

		"vNormal = normal;",

		// multiply our displacement by the
		// amplitude. The amp will get animated
		// so we'll have animated displacement
		"vec3 newPosition = position +",
			"normal *",
			"vec3(displacement *",
				"amplitude);",

		"gl_Position = projectionMatrix *",
			"modelViewMatrix *",
			"vec4(newPosition,1.0);",
			"}"
		].join('\n')
		,
		fragmentShaderLight:[

			"#ifdef GL_ES",
			"precision highp float;",
			"#endif",

			// same name and type as VS
			"varying vec3 vNormal;",

			"void main() {",

				// calc the dot product and clamp
				// 0 -> 1 rather than -1 -> 1
				"vec3 light = vec3(0.5,0.2,1.0);",

				// ensure it's normalized
				"light = normalize(light);",

				"float dProd = max(0.0, dot(vNormal, light));",

				// feed into our frag colour
				"gl_FragColor = vec4(dProd, dProd, dProd, 1.0);",

			"}"
	].join('\n')
};

export {shaderTest};