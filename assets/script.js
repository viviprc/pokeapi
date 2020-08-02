// Función para traducir y dejar en mayúsculas el "Tipo Principal" del pokémon
function traducirTipo(pktipoIngles){
  if (pktipoIngles == "normal"){
    return 'NORMAL'
  }
  if (pktipoIngles == "fighting"){
    return 'LUCHA'
  }
  if (pktipoIngles == "flying"){
    return 'VOLADOR'
  }
  if (pktipoIngles == "poison"){
    return 'VENENO'
  }
  if (pktipoIngles == "ground"){
    return 'TIERRA'
  }
  if (pktipoIngles == "rock"){
    return 'ROCA'
  }
  if (pktipoIngles == "bug"){
    return 'BICHO'
  }
  if (pktipoIngles == "ghost"){
    return 'FANTASMA'
  }
  if (pktipoIngles == "steel"){
    return 'ACERO'
  }
  if (pktipoIngles == "fire"){
    return 'FUEGO'
  }
  if (pktipoIngles == "water"){
    return 'AGUA'
  }
  if (pktipoIngles == "grass"){
    return 'PLANTA'
  }
  if (pktipoIngles == "electric"){
    return 'ELÉCTRICO'
  }if (pktipoIngles == "psychic"){
    return 'PSÍQUICO'
  }
  if (pktipoIngles == "ice"){
    return 'HIELO'
  }
  if (pktipoIngles == "dragon"){
    return 'DRAGÓN'
  }
  if (pktipoIngles == "dark"){
    return 'SINIESTRO'
  }
  if (pktipoIngles == "fairy"){
    return 'HADA'
  }
  if (pktipoIngles == "unknow"){
    return 'DESCONOCIDO'
  }
  if (pktipoIngles == "shadow"){
    return 'OSCURO'
  }
};
// Función para traducir y dejar en mayúsculas el "Hábitat" del pokémon
function traducirHabitat(pkhabitat){
  if (pkhabitat == 'cave'){
    return 'CUEVA'
  }
  if (pkhabitat == 'forest'){
    return 'BOSQUE'
  }
  if (pkhabitat == 'grassland'){
    return 'PRADERA'
  }
  if (pkhabitat == 'mountain'){
    return 'MONTAÑA'
  }
  if (pkhabitat == 'rare'){
    return 'RARO'
  }
  if (pkhabitat == 'rough-terrain'){
    return 'TERRENO DIFÍCIL'
  }
  if (pkhabitat == 'sea'){
    return 'MAR'
  }
  if (pkhabitat == 'urban'){
    return 'CIUDAD'
  }
  if (pkhabitat == 'waters-edge'){
    return 'AGUAS BAJAS'
  }
};
let nombrePoke;
let stats; 
// Cuando el documento esté listo, llemar el select de forma dinámica con los nombres de los pokémones
$(document).ready(() => {
    $.get("https://pokeapi.co/api/v2/pokemon/?limit=100&offset=0",function(data) {
        let pknombre = data.results;
        let pokemones = [];
  
        for(let i = 0; i < pknombre.length; i++){
          pokemones[i] = pknombre[i].name.toUpperCase()
          
          $('#poke-dex').append('<option value="' + parseInt(parseInt(i) + 1) +'">' + pokemones[i] + '</option>');
        }
      },
      );
      // En el click obtener el valor de la selección del input select
      $('select#poke-dex').click((s) => {
        if (s.target.value != '0'){
          var poke_indice = s.target.value
        }
        // LLamado a ajax para obtener informacion y estadisticas del pokmon
        $.ajax({
          url: "https://pokeapi.co/api/v2/pokemon/" + poke_indice,
          success: (info) => {
  
            let tipo = traducirTipo(info.types[0].type.name);
            nombrePoke = info.name.toUpperCase();
            stats = {
              velocidad: info.stats[5].base_stat,
              ataque: info.stats[1].base_stat,
              defensa: info.stats[2].base_stat,
              salud: info.stats[0].base_stat,
              aespecial: info.stats[3].base_stat,
              despecial: info.stats[4].base_stat,
            };
                      
            $('#imagen-f').html("");
            $('#imagen-f').html('<img src="' + info.sprites.front_default + '">');
            $('#imagen-b').html("");
            $('#imagen-b').html('<img src="' + info.sprites.back_default + '">');
            $('#pkid').html("");
            $('#pkid').append(nombrePoke);
            $('#pokedex').html("");
            $('#pokedex').append(info.id);
            $('#tipo').html("");
            $('#tipo').append(tipo);
            $('#velocidad').html("");
            $('#velocidad').append(stats.velocidad);
            $('#ataque').html("");
            $('#ataque').append(stats.ataque);
            $('#defensa').html("");
            $('#defensa').append(stats.defensa);
            $('#salud').html("");
            $('#salud').append(stats.salud);
            $('#aespecial').html("");
            $('#aespecial').append(stats.aespecial);
            $('#despecial').html("");
            $('#despecial').append(stats.despecial);
  
            let pkespecie = info.species.url;
            
            // Llamado a ajax para obtener especies y luego hábitat
            $.ajax({url:pkespecie, success: function(specie){
  
              let pkhabitat = specie.habitat.name;
              let habitatEspanol = traducirHabitat(pkhabitat);
  
              $('#habitat').html("");
              $('#habitat').append(habitatEspanol);
            }}) 
          },
        });
      });
      // En el click, abrir botón de la ventana modal, que contiene la gráfica de estadísticas del pokémon
      $('#boton-modal').on('click', function () {
        // Gráfica de estadísticas
        var options = {
          animationEnabled: true,
          title: {
            text: "ESTADÍSTICAS DE " + nombrePoke
          },
          axisY: {
            title: "Estadísticas (en %)",
            suffix: "%"
          },
          data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: [
              { label: "Velocidad", y: stats.velocidad },	
              { label: "Puntos de Salud", y: stats.salud },	
              { label: "Defensa", y: stats.defensa },
              { label: "Defensa Especial", y: stats.despecial },	
              { label: "Ataque", y: stats.ataque },
              { label: "Ataque Especial", y: stats.aespecial },
            ]
          }]
        };
        $("#chartContainer").CanvasJSChart(options);
        
      })
});


