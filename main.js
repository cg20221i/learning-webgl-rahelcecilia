function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
    //number 5
    0.7, 0.4,
    0.3, 0.4,
    0.3, 0.1,
    0.5, 0.1,
    0.5, 0.0,
    0.3, 0.0, 
    0.3, -0.1,
    0.7, -0.1, 
    0.7, 0.2,
    0.5, 0.2, 
    0.5, 0.3,
    0.7, 0.3,
    0.7, 0.4,

    //number 5 
    0.25, 0.6,
    -0.1, 0.6,
    -0.1, 0.4,
    0.25, 0.4,
    0.25, 0.1,
    -0.1, 0.1,
    

    //letter b
    -0.9, -0.3, 
    -0.9, -0.6,
    -0.7, -0.6, 
    -0.6, -0.52,
    -0.6, -0.4,
    -0.7, -0.32, 
    -0.7, -0.3, 
    -0.6, -0.25, 
    -0.6, -0.1, 
    -0.7, -0.01, 
    -0.9, -0.0,
    
    //letter A LEFT
    -0.35, -0.3,
    -0.5, -0.75,
    -0.7, -0.75,
    

    //letter A RIGHT
    -0.35, -0.3,
    -0.2, -0.75,
    0.015, -0.75,

    //letter A MIDDLE
    -0.49, -0.59,
    -0.25, -0.59,
    -0.22, -0.65,
    -0.49, -0.65,

    //line
    -0.89, 0.48,
    0.8, -0.85


    ];

    //Create a linked-list for storing the vertices data in the GPU realm
    var buffer  = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    // VERTEX SHADER
    var vertexShaderCode = `
        attribute vec2 aPosition;
        void main () { 
            gl_PointSize = 20.0;
            gl_Position = vec4(aPosition, 0.0, 1.0);
            // gl_Position is the final destination for storing
            // positional data  for the rendered vertex
        }
        `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // FRAGMENT SHADER

    var fragmentShaderCode = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(5.4, 2.5, 2.2, 1.9); //change item
        // Blue = R:0, G:0, B:1, A:1
        // gl_FragColor is the final destination for storing
        //color data for the rendered fragment
    }
`;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    
    // Comparing to C-Programming, we may imagine
    //  that up to this step we have created two
    //  object files (.o), for the vertex and fragment shaders

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    //Teach the GPU how to collect
    //the positional values from ARRAY_BUFFER
    //for each vertex being processed
    
    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition")
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);
    

    gl.clearColor(-5.0, -1.5, 0.3, 5.4);  //change background
    //R, G, Blue, Alpha
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_STRIP, 0, 13);
    gl.drawArrays(gl.LINE_STRIP, 13, 6);
    gl.drawArrays(gl.TRIANGLE_FAN,19, 11);
    gl.drawArrays(gl.TRIANGLES,30,3);
    gl.drawArrays(gl.TRIANGLES,33,3);
    gl.drawArrays(gl.TRIANGLE_FAN,36,4)
    gl.drawArrays(gl.LINE_STRIP, 40, 2);
    ;
}