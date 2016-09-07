/**
 * @memberOf plotting
 */
(function( plotting, $, undefined ) {
   
   function HChart(id) {
      this.id = id;
      this.chart = null;
      this.options = {};
      this._exists = false;
      this.exists = function() {
         return (this.chart!=null && this._exists);
      }
      this.destroy = function() {
         if ( this.exists() ) {
            try {
               this.chart.destroy(); 
            } catch (e) {
               console.log(e);
            }
         } else {
            console.log('Chart not yet created');
         }
         this._exists=false;

      }
      this.create = function(callback) {
         if(typeof callback === 'undefined'){
            callback = function(){};
         }
         if ( !this.exists() ) {
            this.chart = new Highcharts.Chart(this.options, callback);
            this._exists=true;
            console.log("Chart created");
         }
      }
      this.reset = function() {
         this.recreate(this.options);
      }
      this.recreate = function(options, callback) {
         if(typeof callback === 'undefined'){
            callback = function(){};
         }
         try {
            if(typeof options === 'undefined'){
               // options not supplied
               options = this.options; //fallback incase chart is not made yet
               options = this.chart.options;
            }
            this.destroy();
         } catch (e) {
            console.log(e);
         } finally {
            try{
               this.chart = new Highcharts.Chart(options, callback);
               this._exists=true;
            } catch (e) {
               console.log("Failed to create chart", e);
            }

         }

      }
      this.resize = function() {
         try {
            this.chart.reflow();
         } catch (e) {
            console.log(e);
         }
      }

   };
   
   plotting.MAXIMALLY_DISTINCT_COLORS = ["#2bce48", "#0075dc", "#993f00", "#4c005c", "#191919", "#005c31", "#f0a3ff", "#ffcc99", "#808080", "#94ffb5", "#8f7c00", "#9dcc00", "#c20088", "#003380", "#ffa405", "#ffa8bb", "#426600", "#ff0010", "#5ef1f2", "#00998f", "#e0ff66", "#740aff", "#990000", "#ffff80", "#ffff00", "#ff5005"];
   
   var isUndefined = function(variable){
      return ( typeof variable === 'undefined' );
   }
   
   plotting.charts = {};
   
   plotting.chart = function(id) {
      return this.charts[id];
   };
   
   plotting.createNewChart = function(id) {
      if ( this.charts[id] ) {
         throw "Id already exists"
      } else {
         this.charts[id]= new HChart(id) ;
      }
   };
   
   plotting.removeAllCharts = function() {
      
      for (name in this.charts) {
         
         this.charts[name].destroy();
         
      }
      
      this.charts = {};
      
   };
   
   plotting.destroyAllCharts = function() {
      
      for (name in this.charts) {
         
         this.charts[name].destroy();
         
      }
      
   };
   

   
   
   plotting.defaultHCOptions = function(config, scaleToggle, noData) {
      /*
       * config.renderTo
       * config.title
       * config.xLabel
       * config.yLabel
       * config.min
       * config.max
       * config.data
       * 
       * */
      var scaleToggle = isUndefined(scaleToggle) ? false : scaleToggle;
      var noData = isUndefined(noData) ? false : noData;
      var options =  {
                      chart: {
                         renderTo: config.renderTo,
                         zoomType: 'x',
                         resetZoomButton: {
                            position: {
                               align: 'left',
                               // verticalAlign: 'top', // by default
                               x: scaleToggle ? 35 : 0,
                               y: -35,
                            }
                         }
                      },
                      title: {
                         text: config.title
                      },

                      xAxis: {
                         type: 'datetime',
                         title: {
                            text: config.xLabel
                         },
                         minRange: 60 * 24 * 3600000 // fourteen days
                      },

                      yAxis: {
                         type: 'linear',
                         title: {
                            text: config.yLabel
                         },
                         labels: {
                            formatter: function () {
                               return this.value;
                            }
                         },
                         min: isUndefined(config.min) ? null : config.min,
                         max: isUndefined(config.max) ? null : config.max,
                      },

                      plotOptions : {
                         series : {
                            events: {
                               legendItemClick: function(event) {

                                  var defaultBehaviour = event.browserEvent.metaKey || event.browserEvent.ctrlKey;

                                  if (!defaultBehaviour) {

                                     var seriesIndex = this.index;
                                     var series = this.chart.series;

                                     var reset = this.isolated;


                                     for (var i = 0; i < series.length; i++)
                                     {
                                        if (series[i].index != seriesIndex)
                                        {
                                           if (reset) {
                                              series[i].setVisible(true, false)
                                              series[i].isolated=false;
                                           } else {
                                              series[i].setVisible(false, false)
                                              series[i].isolated=false; 
                                           }

                                        } else {
                                           if (reset) {
                                              series[i].setVisible(true, false)
                                              series[i].isolated=false;
                                           } else {
                                              series[i].setVisible(true, false)
                                              series[i].isolated=true;
                                           }
                                        }
                                     }
                                     this.chart.redraw();

                                     return false;
                                  }
                               }
                            }
                         }
                      },

                      tooltip: {
                         shared:true,
                         dateTimeLabelFormats:{
                            hour:"%B %Y", 
                            minute:"%B %Y"
                         }
                      },
                      legend : {
                         align : 'right',
                         verticalAlign: 'top',
                         layout: 'vertical',
                         y:20
                      },

                      series: [],

                      colors : plotting.MAXIMALLY_DISTINCT_COLORS,

                      exporting: {
                         enabled: true,
                         sourceWidth  : 1600,
                         sourceHeight : 900,
                         csv: {
                            dateFormat: '%Y-%m-%d'
                         }
                      }
      }
      if (scaleToggle) {
         options.exporting.buttons = {
                                      scaleToggle: {
                                         align:'left',
                                         //verticalAlign:'middle', 
                                         x: 20, 
                                         onclick: function () {
                                            // The toggling of the text is not using an official API, can break with version update!
                                            if (this.yAxis[0].isLog) {
                                               this.exportSVGElements[3].element.nextSibling.innerHTML = "Linear";
                                               this.yAxis[0].update({ type: 'linear', min:baseMin, max:baseMax});
                                            } else {
                                               this.exportSVGElements[3].element.nextSibling.innerHTML = "Log";
                                               this.yAxis[0].update({ type: 'logarithmic', min: null, max:baseMax});
                                            }

                                         },
                                         symbol: 'circle',
                                         symbolFill: '#bada55',
                                         symbolStroke: '#330033',
                                         symbolStrokeWidth: 1,
                                         _titleKey: 'axis_toggle', 
                                         text: 'Linear'
                                      }
         };
         options.lang = {
            axis_toggle: 'Toggle Axis Type: Logarithmic/Linear'
         };
      }

      if ( !noData && !isUndefined(config.data) ){
         for (var i = 0; i < config.data.series.length; i++) {
            var series = config.data.series[i];
            var name = series.name;
            var data = []

            for (var j = 0; j < series.data.length; j++) {
               var point = series.data[j];
               data.push([point.x,point.y]);
            }

            options.series.push({
               name : name,
               data : data
            })

         }      

      }
      
      return options;
   
   };
   
   
}( window.plotting = window.plotting || {}, jQuery ));