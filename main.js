// Gráfico 1: Cargar el archivo JSON para el primer gráfico
fetch('estadisticas-delictuales_Chile.json')
  .then(response => response.json())  // Leer el contenido como JSON
  .then(data => {
    let registros = data.Hoja3;
    let violenciaPorAno = {};

    // Sumar los valores de violencia intrafamiliar por año
    registros.forEach(registro => {
      let año = registro['AÑO'];
      let violencia = registro['Violencia intrafamiliar'] || 0;
      if (violenciaPorAno[año]) {
        violenciaPorAno[año] += violencia;
      } else {
        violenciaPorAno[año] = violencia;
      }
    });

    let años = Object.keys(violenciaPorAno);
    let valoresViolencia = Object.values(violenciaPorAno);

    // Crear un array de colores para los puntos: 2021 y 2022 en rojo, el resto en azul
    let colores = años.map(año => {
      return (año === '2021' || año === '2022') ? 'red' : 'blue';
    });

    // Definir el trazado que combina la línea y los puntos
    var lineaConPuntos = {
      x: años,
      y: valoresViolencia,
      type: 'scatter',
      mode: 'lines',  // Línea sin puntos
      line: { color: 'grey' },  // Color de la línea
      marker: { size: 10, color: colores },  // Colores personalizados para los puntos
      name: 'casos de violencia intrafamiliar'
    };

    // Agregar anotaciones con flechas para 2021 y 2022
    var layout = {
      title: {
        text: 'Casos de violencia intrafamiliar<br><span style="font-size: 16px; color: grey;">De 2020 a 2021 se registro un aumento de cerca de 26.000 casos.</span>',
        font: {
          size: 20
        }
      },  // Título principal con subtítulo
      paper_bgcolor: 'white',  // Color de fondo del gráfico
      plot_bgcolor: 'white',   // Color de fondo de la zona de trazado
      xaxis: { 
        tickvals: años,  // Mostrar todos los años en el eje X
      },
      yaxis: { 
        rangemode: 'tozero',   // Asegura que el eje Y comience desde 0
      },
      showlegend: false,  // Eliminar la leyenda
      annotations: [
        {
          x: '2021.5',  // Punto medio entre 2021 y 2022
          y: (violenciaPorAno['2021'] + violenciaPorAno['2022']) / 2,  // Valor medio de los dos años
          xref: 'x',
          yref: 'y',
          text: 'Aumento significativo durante 2021-2022',
          showarrow: true,
          arrowhead: 6,
          ax: 0,    // Desplazamiento horizontal de la flecha (centrado)
          ay: -50,  // Desplazamiento vertical de la flecha
          font: {
            color: 'red',
            size: 14
          },
          arrowcolor: 'red'
        }
      ]
    };

    // Dibujar el gráfico en el div 'grafico1' combinando la línea y los puntos
    Plotly.newPlot('grafico1', [lineaConPuntos], layout);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));

///////////////////////////////////////
let añoSeleccionado = 2021;
// Cargar el archivo JSON usando fetch
fetch('estadisticas-delictuales_Chile.json')
  .then(response => response.json())  // Leer el contenido como JSON
  .then(data => {
    // Acceder a los datos en la hoja "Hoja3"
    let registros = data.Hoja3;

    // Crear un objeto para almacenar los tipos de violencia para un año específico
    let tiposViolencia = {
      "Violencia intrafamiliar a adulto mayor": 0,
      "Violencia intrafamiliar a hombre": 0,
      "Violencia intrafamiliar a mujer": 0,
      "Violencia intrafamiliar a niño": 0,
      "Violencia intrafamiliar no clasificado": 0
    };

    // Filtrar los registros por el año seleccionado y sumar los valores por tipo de violencia
    registros.forEach(registro => {
      if (registro['AÑO'] === añoSeleccionado) {
        tiposViolencia["Violencia intrafamiliar a adulto mayor"] += registro['Violencia intrafamiliar a adulto mayor'] || 0;
        tiposViolencia["Violencia intrafamiliar a hombre"] += registro['Violencia intrafamiliar a hombre'] || 0;
        tiposViolencia["Violencia intrafamiliar a mujer"] += registro['Violencia intrafamiliar a mujer'] || 0;
        tiposViolencia["Violencia intrafamiliar a niño"] += registro['Violencia intrafamiliar a niño'] || 0;
        tiposViolencia["Violencia intrafamiliar no clasificado"] += registro['Violencia intrafamiliar no clasificado'] || 0;
      }
    });

    // Extraer los tipos de violencia y sus valores en arrays para Plotly
    let tipos = Object.keys(tiposViolencia);
    let valores = Object.values(tiposViolencia);

    // Crear un array de colores, donde "Violencia intrafamiliar a mujer" será rojo y el resto gris
    let colores = tipos.map(tipo => {
      return tipo === "Violencia intrafamiliar a mujer" ? 'red' : 'grey';
    });

    // Crear el funnel plot con Plotly.js
    var datos = {
      type: 'funnel',
      y: tipos,  // Tipos de violencia en el eje Y
      x: valores,  // Valores de violencia en el eje X
      textinfo: "value+percent total",  // Mostrar el valor y el porcentaje
      marker: { color: colores }  // Aplicar colores personalizados
    };

    var layout = {
      title: `Comparación de Tipos de Violencia Intrafamiliar en ${añoSeleccionado}`,
      xaxis: { title: 'Cantidad de Casos' },
      width: 865,   // Mantener el ancho del marco
      height: 500,  // Mantener la altura del gráfico
      margin: {
        l: 150,  // Incrementar el margen izquierdo para las etiquetas
        r: 50,   // Ajustar margen derecho
        t: 50,   // Ajustar margen superior
        b: 50    // Ajustar margen inferior
      },
      xaxis: {
        domain: [0.2, 0.8]  // Hacer el gráfico más estrecho dentro del marco
      }
    };

    // Dibujar el gráfico
    Plotly.newPlot('grafico2', [datos], layout);
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));


  /// GRAFICO DINAMICO
// Cargar el archivo JSON para animar los años
// Cargar el archivo JSON para animar los años
fetch('estadisticas-delictuales_Chile.json')
  .then(response => response.json())  // Leer el contenido como JSON
  .then(data => {
    let registros = data.Hoja3;

    // Crear un objeto para almacenar la suma de tipos de violencia por año
    let violenciaPorAno = {};

    // Sumar los valores de violencia por año y tipo
    registros.forEach(registro => {
      let año = registro['AÑO'];
      if (!violenciaPorAno[año]) {
        violenciaPorAno[año] = {
          "Violencia intrafamiliar a adulto mayor": 0,
          "Violencia intrafamiliar a hombre": 0,
          "Violencia intrafamiliar a mujer": 0,
          "Violencia intrafamiliar a niño": 0,
          "Violencia intrafamiliar no clasificado": 0
        };
      }
      violenciaPorAno[año]["Violencia intrafamiliar a adulto mayor"] += registro['Violencia intrafamiliar a adulto mayor'] || 0;
      violenciaPorAno[año]["Violencia intrafamiliar a hombre"] += registro['Violencia intrafamiliar a hombre'] || 0;
      violenciaPorAno[año]["Violencia intrafamiliar a mujer"] += registro['Violencia intrafamiliar a mujer'] || 0;
      violenciaPorAno[año]["Violencia intrafamiliar a niño"] += registro['Violencia intrafamiliar a niño'] || 0;
      violenciaPorAno[año]["Violencia intrafamiliar no clasificado"] += registro['Violencia intrafamiliar no clasificado'] || 0;
    });

    // Obtener los años en orden
    let años = Object.keys(violenciaPorAno).sort();

    // Inicializar el primer gráfico con el primer año
    let añoInicial = años[0];
    let tipos = Object.keys(violenciaPorAno[añoInicial]);
    let valoresIniciales = Object.values(violenciaPorAno[añoInicial]);

    // Definir colores: "Violencia intrafamiliar a mujer" en rojo, el resto en gris
    let coloresIniciales = tipos.map(tipo => {
      return tipo === "Violencia intrafamiliar a mujer" ? 'red' : 'grey';
    });

    var datos = {
      type: 'funnel',
      y: tipos,  // Tipos de violencia en el eje Y
      x: valoresIniciales,  // Valores de violencia en el eje X
      textinfo: "value+percent total",  // Mostrar el valor y el porcentaje
      marker: { color: coloresIniciales }  // Aplicar colores iniciales
    };

    var layout = {
      title: `Comparación de Tipos de Violencia Intrafamiliar en ${añoInicial}`,
      xaxis: { title: 'Cantidad de Casos' },
      showlegend: false,
      width: 865,   // Mantener el ancho del gráfico
      height: 500,  // Mantener la altura del gráfico
      margin: {
          l: 240,  // Margen izquierdo ajustado
          r: 50,  // Margen derecho ajustado
          t: 50,  // Margen superior ajustado
          b: 50   // Margen inferior ajustado
      }
    };

    // Dibujar el gráfico inicial
    Plotly.newPlot('miGrafico', [datos], layout);

    // Función para actualizar el gráfico por año
    let indice = 0;
    function actualizarGrafico() {
      let añoActual = años[indice];
      let valoresActuales = Object.values(violenciaPorAno[añoActual]);

      // Definir colores: "Violencia intrafamiliar a mujer" en rojo, el resto en gris
      let coloresActuales = tipos.map(tipo => {
        return tipo === "Violencia intrafamiliar a mujer" ? 'red' : 'grey';
      });

      // Actualizar los datos con los nuevos valores y colores
      Plotly.animate('miGrafico', {
        data: [{
          x: valoresActuales,
          marker: { color: coloresActuales }  // Actualizar colores dinámicamente
        }],
        layout: { title: `Comparación de Tipos de Violencia Intrafamiliar en ${añoActual}` }
      }, {
        transition: { duration: 500 },
        frame: { duration: 500, redraw: true }
      });

      // Avanzar al siguiente año en el bucle
      indice = (indice + 1) % años.length;
    }

    // Configurar un bucle para actualizar el gráfico cada 2 segundos (2000 ms)
    setInterval(actualizarGrafico, 500);

  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));
