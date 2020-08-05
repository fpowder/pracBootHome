window.requestAniFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();
window.tempSessionStorage = {};
window.tempTenantList = [];
window.tempStatusList = [];
window.instanceColor = 0;
function renderSelectPointText(chartArea, value, x, y, pointColor) {
  chartArea.beginPath();
  chartArea.fillStyle = pointColor;
  chartArea.strokeStyle = 'rgb(255, 255, 255)';
  chartArea.arc(x, y, 4, 0, ClientUtilities.PI2, false);
  chartArea.closePath();
  chartArea.stroke();
  chartArea.fill();
  
  chartArea.font = ChartStyle.chart_value_font;
  var strWidth = chartArea.measureText(value).width;
  var boxWidth = strWidth + 10;
  
  chartArea.fillStyle = 'rgb(90, 90, 90)';
  chartArea.roundRect(x - boxWidth / 2, y - 9 - 14, x + boxWidth / 2, y - 8, 2);
  chartArea.fill();
  
  chartArea.beginPath();
  chartArea.moveTo(x, y - 3);
  chartArea.lineTo(x + 3, y - 8);
  chartArea.lineTo(x - 3, y - 8);
  chartArea.closePath();
  chartArea.fill();
  
  chartArea.fillStyle = 'rgb(255, 255, 255)';
  chartArea.textAlign = 'center';
  chartArea.textBaseline = "middle";
  chartArea.fillText(value, x, y - 15);
}
function validTenantId(tenants, session_tenantIds) {
  for (var i = 0; count = session_tenantIds.length, i < count; i++) {
    if (_.find(tenants, {'id': session_tenantIds[i]})) {
      return session_tenantIds[i];
    }
  }
  
  if (tenants[0]) {
    return tenants[0].id;
  } else {
    return "";
  }
}
function defineChartPositionSize(defWidth, defHeight) {
  var
    _chartLoader = vics.chart.loader,
    $defineContentArea = $(".topology_physical_wrap");
  if(_.isUndefined($defineContentArea.position())){
    $defineContentArea = $(".topology_user_wrap");
  }
  if(_.isUndefined($defineContentArea.position())){
    $defineContentArea = $(".topology_pop_content");
  }
  
  $("div.vicsChart").each(function () {
    var
      $chartDom = $(this);
    _chartLoader.definePositionSize($defineContentArea, $chartDom, defWidth, defHeight);
  });
}

String.prototype.toLocaleForVics = function () {
  return Number(this).toLocaleForVics();
};
Array.prototype.contains = function (element) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) {
      return true;
    }
  }
  return false;
};
Number.prototype.toShortForVics = function () {
  if (_.isNaN(this)) {
    return 0;
  }
  
  if (this < 100) {
    return parseInt(this * 100) / 100;
  } else {
    return parseInt(this)
  }
};
Number.prototype.toLocaleForVics = function () {
  return this.toShortForVics().toLocaleString();
};
Number.prototype.toUnitString = function (base) {
  base = base || 1000;
  var arr = ['', 'K', 'M', 'G'];
  
  var originValue = this;
  var value = this;
  var len = base.toLocaleForVics().length;
  
  if (value < base) {
    return (Math.round(value * 100) / 100).toLocaleForVics();
  }
  
  originValue = value;
  value = Math.round(originValue) / base;
  
  if (value < base) {
    
    if (originValue.toLocaleForVics().length == len) {
      return (Math.round(originValue * 100) / 100).toLocaleForVics();
    }
    
    return Math.round(value * 100) / 100 + arr[1];
  }
  
  originValue = value;
  value = Math.round(originValue) / base;
  
  if (value < base) {
    
    if (originValue.toLocaleForVics().length == len) {
      return (Math.round(originValue * 100) / 100).toLocaleForVics() + arr[1];
    }
    
    return Math.round(value * 100) / 100 + arr[2];
  }
  
  originValue = value;
  value = Math.round(originValue) / base;
  
  if (value < base) {
    
    if (originValue.toLocaleForVics().length == len) {
      return (Math.round(originValue * 100) / 100).toLocaleForVics() + arr[2];
    }
    
    return Math.round(value * 100) / 100 + arr[3];
  }
  
  return originValue.toLocaleForVics();
};
if (!Date.now) {
  Date.now = function () {
    return +(new Date);
  };
}

var
  VicsFont = {
    fontStyle: {
      "en": "Arial",
      "ko": "Arial"
    },
    
    getFont: function (size, option) {
      var language = "en";
      if (window.vicsuser && window.vicsuser.language) {
        language = window.vicsuser.language;
      }
      
      var style = size + "px " + this.fontStyle[language];
      
      if (!_.isUndefined(option)) {
        style = option + " " + style;
      }
      
      return style;
    }
    
  },
  ChartStyle = {
    "chart_background_color": "rgb(255,255,255)",
    "chart_title_color": "rgb(0,0,0)",
    "chart_title_font": "bold 12px Arial",
    "chart_legend_font": "11px Arial",
    "chart_axis_color": "rgb(191,191,191)",
    "chart_axis_font": "11px Arial",
    "chart_value_font": "bold 11px Arial"
  },
  DevicePixelRatioUtil = {
    isCanvasPointPath: function (chartArea, mousePos) {
      var devicePixelRatio = window.devicePixelRatio || 1;
      return (mousePos && chartArea.isPointInPath(mousePos.x * devicePixelRatio, mousePos.y * devicePixelRatio));
    },
    getMousePosImageData: function (chartArea, mousePos) {
      var devicePixelRatio = window.devicePixelRatio || 1;
      return chartArea.getImageData(mousePos.x * devicePixelRatio, mousePos.y * devicePixelRatio, 1, 1).data;
    }
  },
  ClientUtilities = {
    EMPTY_STRING: "",
    ONE_SECOND: 1000,
    TWO_SECONDS: 1000 * 2,
    TEN_SECONDS: 1000 * 10,
    ONE_MINUTE: 1000 * 60,
    FIVE_MINUTES: 1000 * 60 * 5,
    TEN_MINUTES: 1000 * 60 * 10,
    ONE_HOUR: 1000 * 60 * 60,
    FIVE_HOUR: 1000 * 60 * 60 * 5,
    ONE_DAY: 1000 * 60 * 60 * 24,
    PI2: Math.PI * 2,
    HALF_PI: Math.PI / 2,
    MINUS_HALF_PI: -(Math.PI / 2),
    getMaxValue: function (maxValue) {
      if (maxValue === 0) {
        return 0;
      }
      
      var exponent;
      var fraction;
      var niceFraction;
      var tempMaxValue = maxValue * (100 / 98.5);
      
      var log10Range = Math.log(tempMaxValue) / Math.log(10);
      
      exponent = Math.floor(log10Range);
      fraction = tempMaxValue / Math.pow(10, exponent);
      
      niceFraction = Math.ceil(fraction);
      
      var returnValue = niceFraction * Math.pow(10, exponent);
      
      return parseInt(returnValue * 100) / 100;
    },
    getSplitUnit: function (maxValue, height) {
      var numOfLine = height / 25;
      if (numOfLine < 1) {
        numOfLine = 1;
      }
      
      var result = maxValue / numOfLine;
      var exponent = Math.floor(Math.log(maxValue) / Math.log(10));
      var fraction = result / Math.pow(10, exponent);
      var niceFraction = Math.ceil(fraction);
      
      result = niceFraction * Math.pow(10, exponent);
      
      
      return result;
    },
    getTimeUnit: function (scale) {
      var result = scale;
      if (scale <= this.ONE_SECOND) {
        result = this.ONE_SECOND;
      } else if (scale <= this.ONE_SECOND * 2) {
        result = this.ONE_SECOND * 2;
      } else if (scale <= this.ONE_SECOND * 5) {
        result = this.ONE_SECOND * 5;
      } else if (scale <= this.ONE_SECOND * 10) {
        result = this.ONE_SECOND * 10;
      } else if (scale <= this.ONE_SECOND * 15) {
        result = this.ONE_SECOND * 15;
      } else if (scale <= this.ONE_SECOND * 30) {
        result = this.ONE_SECOND * 30;
      } else if (scale <= this.ONE_MINUTE) {
        result = this.ONE_MINUTE;
      } else if (scale <= this.ONE_MINUTE * 2) {
        result = this.ONE_MINUTE * 2;
      } else if (scale <= this.ONE_MINUTE * 5) {
        result = this.ONE_MINUTE * 5;
      } else if (scale <= this.ONE_MINUTE * 10) {
        result = this.ONE_MINUTE * 10;
      } else if (scale <= this.ONE_MINUTE * 15) {
        result = this.ONE_MINUTE * 15;
      } else if (scale <= this.ONE_MINUTE * 30) {
        result = this.ONE_MINUTE * 30;
      } else if (scale <= this.ONE_HOUR) {
        result = this.ONE_HOUR;
      } else if (scale <= this.ONE_HOUR * 2) {
        result = this.ONE_HOUR * 2;
      } else if (scale <= this.ONE_HOUR * 3) {
        result = this.ONE_HOUR * 3;
      } else if (scale <= this.ONE_HOUR * 4) {
        result = this.ONE_HOUR * 4;
      } else if (scale <= this.ONE_HOUR * 6) {
        result = this.ONE_HOUR * 6;
      } else if (scale <= this.ONE_HOUR * 12) {
        result = this.ONE_HOUR * 12;
      }
      return result;
    }
  },
  MachineStatus = {
    DEFECTED: "DEFECTED",
    FAILED: "FAILED",
    STOPPED: "STOPPED",
    NORMAL: "NORMAL",
    WARNING: "WARNING",
    FATAL: "FATAL",
    RUNNING: "RUNNING",
    CREATING: "CREATING",
    STARTING: "STARTING",
    STOPPING: "STOPPING",
    FORCESTOPPING: "FORCESTOPPING",
    REBOOTING:"REBOOTING",
    FORCEREBOOTING:"FORCEREBOOTING",
    DESTROYING:"DESTROYING",
    MIGRATING:"MIGRATING",
    CHANGING:"CHANGING",
    RESETING:"RESETING",
    UP:"UP",
    DOWN:"DOWN",
    MAINTENANCE:"MAINTENANCE"
  },
  SelectMachineStatus = {
    ALL: "all",
    RUNNING: "running",
    STOPPED: "stopped",
    DEFECTED: "defected",
    NORMAL: "normal",
    WARNING: "warning",
    FATAL: "fatal"
  },
  startTime = window.performance.now ? (performance.now() + performance.timing.navigationStart) : Date.now(),
  getServerTime = (function () {
    var baseTime = startTime;
    
    return function () {
      return Date.now();
    };
  }()),
  getServerMoment = (function (timeStamp) {
    
    return function (timeStamp) {
      var time = getServerTime();
      
      if (!_.isUndefined(timeStamp)) {
        time = timeStamp;
      }
      
      return moment(time).zone(-540);
    };
  }());

var
Color = function (r, g, b, a) {
  this.FACTOR = 0.7;
  
  this.alpha = a;
  this.alpha2 = a;
  if (!this.alpha) {
    this.alpha = 1;
  }
  
  if (!this.alpha2) {
    this.alpha2 = 255;
  }
  
  this.value = ((this.alpha & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | ((b & 0xFF) << 0);
  this.value2 = (this.alpha2 << 24) | (b << 16) | (g << 8) | (r);
  this.value3 = (b << 24) | (this.alpha2 << 16) | (r << 8) | (g );
};
Color.prototype = {
  create: function (color) {
    var result, t, rgba = [];
    
    if (color && color.indexOf("rgba") > -1) {
      t = color.replace("rgba", "").replace("(", "").replace(")", "");
      rgba = t.split(",");
      result = new Color(rgba[0], rgba[1], rgba[2], rgba[3]);
    } else if (color && color.indexOf("rgb") > -1) {
      t = color.replace("rgb", "").replace("(", "").replace(")", "");
      rgba = t.split(",");
      result = new Color(rgba[0], rgba[1], rgba[2]);
    } else if (color && color.indexOf("#") > -1) {
      var r = parseInt(color.substr(1, 2), 16);
      var g = parseInt(color.substr(3, 2), 16);
      var b = parseInt(color.substr(5, 2), 16);
      
      result = new Color(r, g, b);
    }
    
    try {
      return result;
    } finally {
      result = null;
    }
  },
  
  getRGB: function () {
    return this.value;
  },
  
  getRed: function () {
    return (this.getRGB() >> 16) & 0xFF;
  },
  
  getGreen: function () {
    return (this.getRGB() >> 8) & 0xFF;
  },
  
  getBlue: function () {
    return (this.getRGB() >> 0) & 0xFF;
  },
  
  getAlpha: function () {
    return this.alpha;
  },
  
  setAlpha: function (alpha) {
    this.alpha = alpha;
  },
  
  copy: function () {
    return new Color(this.getRed(), this.getGreen(), this.getBlue());
  },
  
  darker: function () {
    return new Color(Math.max((this.getRed() * this.FACTOR) | 0, 0),
      Math.max((this.getGreen() * this.FACTOR) | 0, 0),
      Math.max((this.getBlue() * this.FACTOR) | 0, 0));
  },
  
  toString: function () {
    return "rgba(" + this.getRed() + "," + this.getGreen() + "," + this.getBlue() + "," + this.getAlpha() + ")";
  }
};
var
Map = function () {
  this.map = {};
};
Map.prototype = {
  put: function (key, value) {
    this.map[key] = value;
  },
  
  add: function (key, value) {
    this.map[key] = value;
    return this;
  },
  
  get: function (key) {
    return this.map[key];
  },
  
  clear: function () {
    for (propId in this.map) {
      delete this.map[propId];
    }
  },
  
  remove: function (key) {
    delete this.map[key];
  },
  
  keys: function () {
    return Object.keys(this.map);
  },
  
  values: function () {
    var values = [];
    for (propId in this.map) {
      values.push(this.map[propId]);
    }
    return values;
  },
  
  size: function () {
    var count = 0;
    for (propId in this.map) {
      count++;
    }
    return count;
  }
};

CanvasRenderingContext2D.prototype.roundBar = function (sx, sy, ex, ey, r) {
  var r2d = Math.PI / 180;
  if (( ex - sx ) - ( 2 * r ) < 0) {
    r = ( ( ex - sx ) / 2 );
  }
  if (( ey - sy ) - ( 2 * r ) < 0) {
    r = ( ( ey - sy ) / 2 );
  }
  this.beginPath();
  this.moveTo(sx + r, sy);
  this.lineTo(ex - r, sy);
  this.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false);
  this.lineTo(ex, ey);
  this.lineTo(sx, ey);
  this.lineTo(sx, sy + r);
  this.arc(sx + r, sy + r, r, r2d * 180, r2d * 270, false);
  this.closePath();
};
CanvasRenderingContext2D.prototype.roundRect = function (sx, sy, ex, ey, r) {
  var r2d = Math.PI / 180;
  if (( ex - sx ) - ( 2 * r ) < 0) {
    r = ( ( ex - sx ) / 2 );
  }
  if (( ey - sy ) - ( 2 * r ) < 0) {
    r = ( ( ey - sy ) / 2 );
  }
  this.beginPath();
  this.moveTo(sx + r, sy);
  this.lineTo(ex - r, sy);
  this.arc(ex - r, sy + r, r, r2d * 270, r2d * 360, false);
  this.lineTo(ex, ey - r);
  this.arc(ex - r, ey - r, r, 0, r2d * 90, false);
  this.lineTo(sx + r, ey);
  this.arc(sx + r, ey - r, r, r2d * 90, r2d * 180, false);
  this.lineTo(sx, sy + r);
  this.arc(sx + r, sy + r, r, r2d * 180, r2d * 270, false);
  this.closePath();
};

function CallAnimation(timestamp) {
  vics.render("requestAniFrame", [timestamp]);
  window.globalRequestAniFrameStatus = window.requestAniFrame(CallAnimation);
}
window.globalRequestAniFrameStatus = window.requestAniFrame(CallAnimation);

var
vics = window.vics = vics || {};
vics.events = {};
vics.on = function (name, func, chartArea, options) {
  var handlers = vics.events[name] || (vics.events[name] = []);
  handlers.push({callback: func, chartArea: chartArea, options: options || {once: false}});
  return func;
};
vics.render = function (name, args) {
  var handlers = vics.events[name] || [];
  
  if (handlers.length == 0) {
    return;
  }
  args = args || [];
  var onceList = [];
  for (i = 0, len = handlers.length; i < len; i++) {
    var h = handlers[i];
    h.callback.apply(h.chartArea, args);
    
    if (h.options.once) {
      onceList.push(i);
    }
  }
};
vics.chart = {};
vics.chart.builder = vics.chart.builder || {};
vics.$C = vics.chart;
vics.loader = function (ns) {
  var parts = ns.split('.'),
    parent = vics,
    i;
  
  if (parts[0] === 'vics') {
    parts = parts.slice(1);
  }
  
  for (i = 0; i < parts.length; i += 1) {
    if (typeof parent[parts[i]] === 'undefined') {
      parent[parts[i]] = {};
    }
    
    parent = parent[parts[i]];
  }
  
  return parent;
};
vics.chart.builder.loader = function (charttype) {
  return vics.loader('chart.builder.' + charttype);
};
vics.chart.builder.update = function (chart) {
  if (!chart.intervalId) {
    var builder = vics.loader('chart.builder.' + chart.chartType);
    builder.update(chart);
  }
};
vics.loader('chart.websocket');
vics.loader('chart.tenant');
vics.loader('chart.color');
vics.chart.websocket = (function(ctx){
  var _$C = ctx.chart;
  var
    _subscribeUrl,
    _sendUrl,
    _stompClient = {},
    _sendObject={},
    _isMonitoring = false,
    setSubscribeUrl = function(subscribeUrl){
      _subscribeUrl = subscribeUrl;
    },
    setSendUrl = function(sendUrl){
      _sendUrl = sendUrl;
    },
    setSendObject = function(sendObject){
      _sendObject = sendObject;
    },
    reconnect = function(error){
      console.log(error);
      setTimeout(function(){
        console.log("reconnect");
        connect();
      }, ClientUtilities.ONE_SECOND * 3)
    },
    connect = function(){
      _stompClient = Stomp.over(new SockJS("/monitorings", null, {"transports": "websocket"}));
      with(_stompClient){
        connect({}, function(frame){
          subscribe(_subscribeUrl, function(message){
            var monitoringObject = JSON.parse(message.body);
            if(!_.isUndefined(monitoringObject.totalUsageForGuage)){
              if(_.isUndefined(monitoringObject.totalUsageForGuage.dashBoardWebdav)){
                initGuageChartForAdmin(monitoringObject.totalUsageForGuage);
              }else{
                _isMonitoring = true;
                initGuageChartForTenant(monitoringObject.totalUsageForGuage);
              }
            }
            
            if(_.isUndefined(monitoringObject.servers)){
              monitoringObject = monitoringObject.nodes;
            }else{
              monitoringObject = monitoringObject.servers;
            }
            if(monitoringObject){
              var
              _tenantHandler = vics.manager.tenant;
              _tenantHandler.callback(monitoringObject);
              
              if(_isMonitoring){
                var obj = {}, data = [];
                var instanceInfo = _tenantHandler.getInstanceListInfo();
                $("#allVmCount").text(instanceInfo.total);
                $("#normalVmCount").text(instanceInfo.normal);
                $("#normalVmGraph").css("width", ((instanceInfo.normal/instanceInfo.total)*100)+"%");
                $("#warningVmCount").text(instanceInfo.warning);
                $("#warningVmGraph").css("width", ((instanceInfo.warning/instanceInfo.total)*100)+"%");
                $("#fatalVmCount").text(instanceInfo.fatal);
                $("#fatalVmGraph").css("width", ((instanceInfo.fatal/instanceInfo.total)*100)+"%");
                
                $("#normalStopVmCount").text(instanceInfo.stop);
                $("#normalStopVmGraph").css("width", ((instanceInfo.stop/instanceInfo.total)*100)+"%");
                $("#defectStopVmCount").text(instanceInfo.defect);
                $("#defectStopVmGraph").css("width", ((instanceInfo.defect/instanceInfo.total)*100)+"%");
                
                obj["runningVmGaugeChart"] = {"label":"RUNNING", "labelColor":"black", "value":instanceInfo.running,"lineColor":"white", "maxValue":instanceInfo.total};
                obj["stopVmGaugeChart"] = {"label":"STOPPED", "labelColor":"black", "value":(instanceInfo.stop+instanceInfo.defect),"lineColor":"white", "maxValue":instanceInfo.total};
                data.push(obj);
                vics.chart.model.donut.shared.init(data);
              }
              
              vics.chart.model.equalizer.shared.callback(monitoringObject);
              var _charts = _$C.loader.realtimeCharts();
              for (var j = 0, max = _charts.length; j < max; j++) {
                var chart = _charts[j];
                if (chart.getModel().callback) {
                  chart.getModel().callback(monitoringObject);
                }
              }
            }
          });
          send(_sendUrl, {}, JSON.stringify(_sendObject))
        }, reconnect);
        debug = null;
      }
    },
    disconnect = function(){
      _stompClient.disconnect();
    },
    initGuageChartForAdmin = function(dashboarObject){
      var dashboardArray = dashboarObject.dashboardResourceCount;
      var dashboardExtArray = [];
      var isResource = true;
      if(_.isUndefined(dashboardArray)){
        dashboardArray = dashboarObject.dashboardAssetUsage;
        dashboardExtArray = dashboarObject.dashboardAssetCount;
        isResource = false;
      }
      
      var data = [];
      if(isResource){
        for (key = 0; key < dashboardArray[0].length; key++) {
          var keyLabel = dashboardArray[0][key];
          keyLabel = "dashBoard" + keyLabel.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,'').replace(/ /g,'');
          var obj = {};
          obj[keyLabel] = {"label":dashboardArray[0][key], "labelColor":"black", "value":dashboardArray[1][key],"lineColor":"white", "maxValue":dashboardArray[2][key]};
          data.push(obj);
        }
      }else{
        for (key = 0; key < dashboardArray[0].length; key++) {
          var keyLabel = dashboardArray[0][key];
          keyLabel = "dashBoard" + keyLabel.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,'').replace(/ /g,'');
          var obj = {};
          obj[keyLabel] = {"label":dashboardArray[0][key], "labelColor":"black", "value":dashboardArray[1][key],"lineColor":"white", "maxValue":dashboardArray[2][key]};
          data.push(obj);
        }
        
        for (key = 0, max = dashboardExtArray[0].length; key < max; key++) {
          if(!_.isUndefined(dashboardExtArray[0][key])){
            var keyLabel = dashboardExtArray[0][key];
            keyLabel = "dashBoard" + keyLabel.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,'').replace(/ /g,'');
            var label = dashboardExtArray[0][key];
            if(keyLabel === "dashBoardVLAN"){
              keyLabel += "Property";
              label += " Property";
            }
            
            if(keyLabel === "dashBoardIP"){
              keyLabel += "Property";
              label += " Property";
            }
            var obj = {};
            obj[keyLabel] = {"label":label, "labelColor":"black", "value":dashboardExtArray[1][key],"lineColor":"white", "maxValue":0};
          }
          data.push(obj);
        }
      }
      vics.chart.model.donut.shared.init(data);
    },
    initGuageChartForTenant = function(dashboardObject){
      var data = [];
      for(_key in dashboardObject){
        var keyLabel = _key;
        var dashboardArray = dashboardObject[_key];
        var obj = {};
        obj[keyLabel] = {"label":keyLabel.substring(9), "labelColor":"black", "value":dashboardArray[1],"lineColor":"white", "maxValue":dashboardArray[0]};
        data.push(obj);
      }
      vics.chart.model.donut.shared.init(data);
    },
    process = function (list, _callback) {
      if (list) {
        if (_.isArray(list)) {
          for (var i = 0, max = list.length; i < max; i++) {
            var data = list[i].data;
            _callback(data, i);
          }
        } else {
          _callback(list, 0);
        }
      }
    };
  
  return{
    setSubscribeUrl : setSubscribeUrl,
    setSendUrl : setSendUrl,
    setSendObject:setSendObject,
    connect : connect,
    disconnect : disconnect,
    process : process
  }
}(vics));
vics.chart.loader = (function (ctx) {
  var
    _$C_BUILDER = ctx.chart.builder,
    _realtimeCharts = {};
    initTenantBar = function (tenants) {
      var tenantId = validTenantId(tenants, []);
      vics.manager.tenant.init(tenants, tenantId);
      vics.manager.tenant.makeInstanceBar();
    },
    initTenant = function (tenants) {
      var tenantId = validTenantId(tenants, []);
      vics.manager.tenant.init(tenants, tenantId);
    },
    initByProp = function (criticalValues, websocketOptions, sizeDef) {
      var $defineContentArea = $(".topology_physical_wrap");
      if(_.isUndefined($defineContentArea.position())){
        $defineContentArea = $(".topology_user_wrap");
      }
      if(_.isUndefined($defineContentArea.position())){
        $defineContentArea = $(".topology_pop_content");
      }
      var defWidth, defHeight;
      if(sizeDef){
        if(sizeDef.hasOwnProperty("defWidth")){
          defWidth = sizeDef.defWidth;
        }
  
        if(sizeDef.hasOwnProperty("defHeight")){
          defHeight = sizeDef.defHeight;
        }
      }
      var chartsProp = $("div.vicsChart");
      for (var i = 0; i < chartsProp.length; i++) {
        var chartOption = chartsProp[i];
        var $chartDom = jQuery(chartOption);
        definePositionSize($defineContentArea, $chartDom, defWidth, defHeight);
        initChart($chartDom, criticalValues);
      }
      
      var tenantIdTenantId = vics.manager.tenant.currentTenantId();
      var realtimeCharts = vics.chart.loader.realtimeCharts();
      
      for (var i = 0, max = realtimeCharts.length; i < max; i++) {
        var chart = realtimeCharts[i],
          model = chart.getModel();
        
        if (model) {
          vics.chart.loader.setTenantId(tenantIdTenantId, model);
        }
      }
      
      socketInit(websocketOptions);
    },
    initByPropManager = function (criticalValues, websocketOptions, sizeDef, keyId) {
      var $defineContentArea = $(".topology_physical_wrap");
      if(_.isUndefined($defineContentArea.position())){
        $defineContentArea = $(".topology_user_wrap");
      }
      if(_.isUndefined($defineContentArea.position())){
        $defineContentArea = $(".topology_pop_content");
      }
      var defWidth, defHeight;
      if(sizeDef){
        if(sizeDef.hasOwnProperty("defWidth")){
          defWidth = sizeDef.defWidth;
        }
    
        if(sizeDef.hasOwnProperty("defHeight")){
          defHeight = sizeDef.defHeight;
        }
      }
      var chartsProp = $(".topology_panel_content div.vicsChart");
  
      for (var i = 0; i < chartsProp.length; i++) {
        var chartOption = chartsProp[i];
        var $chartDom = jQuery(chartOption);
        definePositionSize($defineContentArea, $chartDom, defWidth, defHeight);
        initChart($chartDom, criticalValues);
      }
      var keyArray = [];
      var key = keyId || "nodes";
      keyArray.push(key);
      
      var tenantIdTenantId = keyArray;
      var realtimeCharts = vics.chart.loader.realtimeCharts();
      for (var i = 0, max = realtimeCharts.length; i < max; i++) {
        var chart = realtimeCharts[i],
          model = chart.getModel();
    
        if (model) {
          vics.chart.loader.setTenantId(tenantIdTenantId, model);
        }
      }
  
      socketInit(websocketOptions);
    },
    socketInit = function (websocketOptions) {
      var $VICS_CHART_WEBSOCKET = vics.chart.websocket;
      if (_.keys(_realtimeCharts).length > 0 || vics.manager.tenant.multiTenantId().length > 0) {
        $VICS_CHART_WEBSOCKET.setSubscribeUrl(websocketOptions.subscribe);
        $VICS_CHART_WEBSOCKET.setSendUrl(websocketOptions.send);
        if(websocketOptions.sendObject){
          $VICS_CHART_WEBSOCKET.setSendObject(websocketOptions.sendObject);
        }
        $VICS_CHART_WEBSOCKET.connect();
      }
    },
    initChart = function ($chartDom, criticalValues) {
      var
      chartId = $chartDom.attr('id'),
      type = $chartDom.attr('type'),
      charttype = $chartDom.attr('charttype'),
      optimized = $chartDom.attr('optimized'),
      fixedMax = $chartDom.attr('fixedmax'),
      chartWidth = $chartDom.attr('chartwidth');
      lineWidth = $chartDom.attr("linewidth");
      
      var cmdMap = {"key": chartId, "chartName":chartId, "warningCritical": criticalValues.warningCritical, "fatalCritical":criticalValues.fatalCritical};
      var optionMap = {"optimized": optimized, "fixedmax": fixedMax, "chartwidth":chartWidth, "linewidth":lineWidth};
      
      var bulider = _$C_BUILDER.loader(charttype);
      var chart = bulider.build($chartDom, cmdMap, optionMap);
      if(charttype != "donut"){
        _realtimeCharts[chartId] = chart;
      }
      return chart;
    },
    definePositionSize = function ($defineContentArea, $chartDom, defWidth, defHeight) {

      var
      contentWidth = defWidth || $chartDom.parent().innerWidth(),
      contentHeight = defHeight || 120;
      var position = $defineContentArea.position();
      var padding = 4;
      $chartDom.css("width", parseInt(position.left + contentWidth * 100 * 0.01) - (position.left + contentWidth * 0 * 0.01) - padding * 2);
      $chartDom.css("height", contentHeight - (contentHeight * 0.05));
    },
    realtimeCharts = function () {
      return _.values(_realtimeCharts);
    },
    realtimeChart = function (key) {
      return _realtimeCharts[key];
    },
    clear = function () {
      var realtimeCharts = this.realtimeCharts();
      for (var i = 0, max = realtimeCharts.length; i < max; i++) {
        if (realtimeCharts[i].getModel()) {
          realtimeCharts[i].getModel().clear();
        }
      }
    },
    stopCharts = function () {
      vics.render("stopCharts");
    },
    startCharts = function () {
      vics.render("startCharts");
    },
    setTenantId = function (tenantId, model) {
      var cmdMap = model.cmdMap;
      if (cmdMap) {
        cmdMap.tenantId = tenantId;
      }
    };
  
  return {
    initByProp: initByProp,
    initByPropManager: initByPropManager,
    initTenantBar: initTenantBar,
    initTenant:initTenant,
    socketInit: socketInit,
    initChart: initChart,
    setTenantId: setTenantId,
    realtimeCharts: realtimeCharts,
    realtimeChart: realtimeChart,
    definePositionSize: definePositionSize,
    stopCharts: stopCharts,
    startCharts: startCharts,
    clear: clear
  };
}(vics));
vics.manager = {};
vics.manager.tenant = (function () {
  var
    _data = [],
    _instanceInfo,
    _tenant,
    _selectStatus,
    _isStatus = false,
    _statusInstance = [],
    _cachedSelectedInstanceList = [],
    _cachedSelectedInstanceKeys = [],
    _cachedInstanceKeys = [],
    _moreHeightSizeHandler = 0,
    _handler,
    _instanceSelectHandlers = [],
    _tenantSelectHandlers = [];
  
  function _tenantInit(tenant, i) {
    tenant.__proto__ = {
      key: function () {
        return this.id;
      },
      
      uuid: function () {
        return this.uuid;
      },
      
      isRunning: function () {
        return true;
      },
      
      isNormal: function () {
        return false;
      },
      
      isWarning: function () {
        return false;
      },
      
      isFatal: function () {
        return false;
      },
      
      isDefected: function () {
        return false;
      },
      
      isStopped: function () {
        return false;
      },
      
      isFailed: function(){
        return false;
      },
      
      name: function () {
        return this.id;
      },
      
      color: function (color) {
        if (color) {
          this._color = color;
        }
        
        return this._color;
      }
    };
    tenant.color(vics.chart.color.newColor(i));
    
    tenant.insCount = 0;
    
    return tenant;
  }
  
  function _instanceInit(instance, i) {
    delete instance.name;
    instance.__proto__ = {
      key: function () {
        return this.id;
      },
      
      uuid: function () {
        return this.id;
      },
      
      host: function () {
        return this.ip;
      },
      
      selected: function (selected) {
        if (selected == true) {
          this.selected = true;
        } else if (selected == false) {
          this.selected = false;
        }
        
        return this.selected;
      },
      
      name: function () {
        return this.hostName;
      },
      
      isRunning: function () {
        return (!this.isStopped() && !this.isDefected() && !this.isFailed());
      },
      
      isNormal: function () {
        return (this.state === MachineStatus.NORMAL || this.nodeState === MachineStatus.NORMAL || this.state === MachineStatus.RUNNING || this.nodeState === MachineStatus.UP);
      },
      
      isWarning: function () {
        return (this.state === MachineStatus.WARNING || this.nodeState === MachineStatus.WARNING);
      },
      
      isFatal: function () {
        return (this.state === MachineStatus.FATAL || this.nodeState === MachineStatus.FATAL);
      },
      
      isDefected: function () {
        return (this.state === MachineStatus.DEFECTED || this.nodeState === MachineStatus.DEFECTED);
      },
      
      isStopped: function () {
        var status = this.state || this.nodeState;
        return (status === MachineStatus.STOPPED || status === MachineStatus.DOWN);
      },
      
      isFailed: function(){
        return (this.state === MachineStatus.FAILED || this.nodeState === MachineStatus.FAILED);
      },
      
      color: function (color) {
        if (color) {
          this._color = color;
        }
        
        return this._color;
      }
      
    };
    instance.color(vics.chart.color.newColor(i));
    
    instance["selected"] = false;
  }
  
  function selectSingleTenant(tenantId) {
    _statusInstance = [];
    _cachedSelectedInstanceList = [];
    _cachedSelectedInstanceKeys = [];
    if (!_isStatus) {
      if (_tenant && _tenant.id !== tenantId) {
        $.each(_tenant.vmExtInfoList, function (i, instance) {
          instance.selected = false;
        });
      }
      for (i = 0; count = _data.length, i < count; i++) {
        if (_data[i].id === tenantId) {
          _tenant = _data[i];
          _tenant.selected = !_tenant.selected;
          
          _cachedInstanceKeys = [];
          for (j = 0, max = _tenant.vmExtInfoList.length; j < max; j++) {
            _cachedInstanceKeys.push(_tenant.vmExtInfoList[j].key());
          }
          
        } else {
          _data[i].selected = false;
        }
      }
    } else {
      if (_statusInstance && _statusInstance.length > 0) {
        _statusInstance = [];
      }
      var _tempCachedInstanceKeys = [];
      window.instanceColor = 0;
      for (i = 0; count = _data.length, i < count; i++) {
        var instance;
        if (SelectMachineStatus.ALL === tenantId) {
          _data[i].selected = false;
          for (j = 0, max = _data[i].vmExtInfoList.length; j < max; j++) {
            _instanceInit(_data[i].vmExtInfoList[j], window.instanceColor++);
            instance = _data[i].vmExtInfoList[j];
            _tempCachedInstanceKeys.push(instance.id);
            _statusInstance.push(instance);
          }
        } else if (SelectMachineStatus.RUNNING === tenantId) {
          _data[i].selected = false;
          for (j = 0, max = _data[i].vmExtInfoList.length; j < max; j++) {
            var status = _data[i].vmExtInfoList[j].state || _data[i].vmExtInfoList[j].nodeState;
            if (status !== MachineStatus.STOPPED && status !== MachineStatus.DEFECTED && status !== MachineStatus.FAILED  && status !== MachineStatus.DOWN) {
              _instanceInit(_data[i].vmExtInfoList[j], window.instanceColor++);
              instance = _data[i].vmExtInfoList[j];
              _tempCachedInstanceKeys.push(instance.id);
              _statusInstance.push(instance);
            }
          }
        } else if (SelectMachineStatus.STOPPED === tenantId) {
          _data[i].selected = false;
          for (j = 0, max = _data[i].vmExtInfoList.length; j < max; j++) {
            if (_data[i].vmExtInfoList[j]) {
              var status = _data[i].vmExtInfoList[j].state || _data[i].vmExtInfoList[j].nodeState;
              if (status === MachineStatus.STOPPED || status === MachineStatus.DEFECTED || status === MachineStatus.FAILED || status === MachineStatus.DOWN) {
                _instanceInit(_data[i].vmExtInfoList[j], window.instanceColor++);
                instance = _data[i].vmExtInfoList[j];
                _tempCachedInstanceKeys.push(instance.id);
                _statusInstance.push(instance);
              }
            }
          }
        } else if (SelectMachineStatus.NORMAL === tenantId) {
          _data[i].selected = false;
          for (j = 0, max = _data[i].vmExtInfoList.length; j < max; j++) {
            if (_data[i].vmExtInfoList[j]) {
              var status = _data[i].vmExtInfoList[j].state || _data[i].vmExtInfoList[j].nodeState;
              if (status === MachineStatus.NORMAL) {
                _instanceInit(_data[i].vmExtInfoList[j], window.instanceColor++);
                instance = _data[i].vmExtInfoList[j];
                _tempCachedInstanceKeys.push(instance.id);
                _statusInstance.push(instance);
              }
            }
          }
        } else if (SelectMachineStatus.WARNING === tenantId) {
          _data[i].selected = false;
          for (j = 0, max = _data[i].vmExtInfoList.length; j < max; j++) {
            if (_data[i].vmExtInfoList[j]) {
              var status = _data[i].vmExtInfoList[j].state || _data[i].vmExtInfoList[j].nodeState;
              if (status === MachineStatus.WARNING) {
                _instanceInit(_data[i].vmExtInfoList[j], window.instanceColor++);
                instance = _data[i].vmExtInfoList[j];
                _tempCachedInstanceKeys.push(instance.id);
                _statusInstance.push(instance);
              }
            }
          }
        } else if (SelectMachineStatus.FATAL === tenantId) {
          _data[i].selected = false;
          window.instanceColor = 0;
          for (j = 0, max = _data[i].vmExtInfoList.length; j < max; j++) {
            if (_data[i].vmExtInfoList[j]) {
              var status = _data[i].vmExtInfoList[j].state || _data[i].vmExtInfoList[j].nodeState;
              if (status === MachineStatus.FATAL) {
                _instanceInit(_data[i].vmExtInfoList[j], window.instanceColor++);
                instance = _data[i].vmExtInfoList[j];
                _tempCachedInstanceKeys.push(instance.id);
                _statusInstance.push(instance);
              }
            }
          }
        }
      }
      _cachedInstanceKeys = _tempCachedInstanceKeys;
    }
  }
  
  function filterInstance(data) {
    return data;
  }
  
  function _instanceInTenant(data, uuid) {
    if (!_isStatus) {
      for (i = 0; i < data.vmExtInfoList.length; i++) {
        if (data.vmExtInfoList[i].id === uuid) {
          return data.vmExtInfoList[i];
        }
      }
    } else {
      for (_tenanatIdx = 0; _tenanatIdx < data.length; _tenanatIdx++) {
        var tenantObj = data[_tenanatIdx].vmExtInfoList;
        if (tenantObj && tenantObj.length > 0) {
          for (_vmIdx = 0; _vmIdx < tenantObj.length; _vmIdx++) {
            var vmInstance = tenantObj[_vmIdx];
            if (vmInstance.id === uuid) {
              return vmInstance;
            }
          }
        }
      }
    }
    
    return undefined;
  }
  
  function _dataInit(data, criticalValues) {
    _data = data;
    window.instanceColor = 0;
    $.each(_data, function (i, tenant) {
      _tenantInit(tenant, i);
      $.each(tenant.vmExtInfoList, function (j, instance) {
        _instanceInit(instance, window.instanceColor++ , criticalValues);
      });
    });
  }
  
  this.init = function (data, tenantId) {
    _dataInit(data);
    if (tenantId) {
      selectSingleTenant(tenantId);
      _instanceInfo = _searchInstanceListInfo();
    }
  };
  
  this.callback = function (json) {
    if (!json || !json.tenantList) {
      return false;
    }
    
    var data = json.tenantList;
    if(json && json.hasOwnProperty("tenantListVmIds") && json.tenantListVmIds.length > 0){

      if(json.tenantListVmIds[0] != null){
        var extraData = json.tenantListVmIds[0].vmExtInfoList;
        for(_extraDataIdx = 0, _maxDataIdx = extraData.length ; _extraDataIdx < _maxDataIdx ; _extraDataIdx++){
          var status = extraData[_extraDataIdx].state;
          var machineId = extraData[_extraDataIdx].id;
          if(status === MachineStatus.RUNNING || status === MachineStatus.NORMAL){
            vmStatusClass = "tl01";
          }else if(status === MachineStatus.WARNING){
            vmStatusClass = "tl02";
          }else if(status === MachineStatus.FATAL){
            vmStatusClass = "tl03";
          }else if(status === MachineStatus.STOPPED || status === MachineStatus.DOWN || status === MachineStatus.FAILED){
            vmStatusClass = "tl05";
          }else if(status === MachineStatus.DEFECTED){
            vmStatusClass = "tl04";
          }else{
            vmStatusClass = "tl04";
          }
          var $machineIcon = $("#"+machineId);

          if($machineIcon.hasClass("prev")){
            $("#"+machineId).removeClass().addClass(vmStatusClass + " prev");
          }

          if($machineIcon.hasClass("next")){
            $("#"+machineId).removeClass().addClass(vmStatusClass + " next");
          }

        }

      }
    }
  
    if(data && data.length > 0 && data[0] != null && data[0].vmExtInfoList){
      if(!_.isUndefined(data[0].vmExtInfoList)){
        var tmpVm = data[0].vmExtInfoList[0];
        var $vmName = $("span#vmName");
        var $cpuCore = $("span#cpuCore");
        var $memTotal = $("span#memTotal");
        var $diskTotal = $("span#diskTotal");
        if($vmName.length > 0){
          $vmName.text(tmpVm.hostName);
        }
  
        if($cpuCore.length > 0){
          $cpuCore.text(tmpVm.cpuSpec+" Core");
        }
  
        if($memTotal.length > 0){
          $memTotal.text(tmpVm.memSpec+" G");
        }
  
        if($diskTotal.length > 0){
          $diskTotal.text(tmpVm.diskSpec+" G");
        }
      }
    }


    for (var i = 0; i < data.length; i++) {
      if(data[i]){
        for(_tenantIdx =0, _tenantMax = _data.length; _tenantIdx < _tenantMax ; _tenantIdx++){
          if(data[i].id === _data[_tenantIdx].id){
            for(vmIdx =0, max = data[i].vmExtInfoList.length; vmIdx < max ; vmIdx++){
              var vmObj = data[i].vmExtInfoList[vmIdx];
              for(_vmIdx =0, _max = _data[_tenantIdx].vmExtInfoList.length; _vmIdx < _max ; _vmIdx ++){
                if(vmObj.id === _data[_tenantIdx].vmExtInfoList[_vmIdx].id){
                  var status = vmObj.state || vmObj.nodeState;
                  _data[_tenantIdx].vmExtInfoList[_vmIdx].state = status;
                }
              }
            }
          }
        }
      }else{
        for(_vmIdx =0, _max = _data[i].vmExtInfoList.length; _vmIdx < _max ; _vmIdx ++){
          _data[i].vmExtInfoList[_vmIdx].state = MachineStatus.DEFECTED;
        }
      }
      
    }
    
    if(!_isStatus){
      window.instanceColor = 0;
      
      for (var i = 0; i < data.length; i++) {
        if(data[i]){
          var tenant = this.tenant(data[i].id);
  
          if (tenant) {
    
            if (_tenant && _tenant.id === data[i].id) {
              var vmExtInfoLists = data[i].vmExtInfoList;
              var vmExtInfoList, findedAgents, uuid;
      
              for (j = 0, max = _tenant.vmExtInfoList.length; j < max; j++) {
                vmExtInfoList = _tenant.vmExtInfoList[j];
                findedAgents = _.where(vmExtInfoLists, {'id': vmExtInfoList.id});
                if (findedAgents.length === 0) {
          
                  var uuid = vmExtInfoList.id;
                  _tenant.vmExtInfoList.splice(j, 1);
                  j--;
                  max--;
          
                  $(".topology_network_vmlist li[id='" + uuid + "']").remove();
                }
              }
              for (j = 0, max = _cachedInstanceKeys.length; j < max; j++) {
                uuid = _cachedInstanceKeys[j];
                findedAgents = _.where(vmExtInfoLists, {'id': uuid});
        
                if (findedAgents.length === 0) {
                  _cachedInstanceKeys.splice(j, 1);
                  j--;
                  max--;
                }
              }
              for (j = 0, max = _cachedSelectedInstanceList.length; j < max; j++) {
                vmExtInfoList = _cachedSelectedInstanceList[j];
                findedAgents = _.where(vmExtInfoLists, {'id': vmExtInfoList.id});
        
                if (findedAgents.length === 0) {
                  _cachedSelectedInstanceList.splice(j, 1);
                  j--;
                  max--;
                }
              }
              for (j = 0, max = _cachedSelectedInstanceKeys.length; j < max; j++) {
                uuid = _cachedSelectedInstanceKeys[j];
                findedAgents = _.where(vmExtInfoLists, {'id': uuid});
        
                if (findedAgents.length === 0) {
                  _cachedSelectedInstanceKeys.splice(j, 1);
                  j--;
                  max--;
                }
              }
              for (j = 0; j < vmExtInfoLists.length; j++) {
                var self = this,
                  instance = _instanceInTenant(_tenant, vmExtInfoLists[j].id);
        
                if (instance == undefined) {
                  instance = vmExtInfoLists[j];
          
                  _instanceInit(instance, window.instanceColor++);
                  _tenant.vmExtInfoList.push(instance);
                  _cachedInstanceKeys.push(instance.id);
          
                  if (j > 0) {
                    this.makeInstanceBar(instance.id);
                  } else {
                    this.makeInstanceBar();
                  }
                } else {
                  if(instance != undefined){
                    var vmStatusClass = "";
                    var status = vmExtInfoLists[j].state || vmExtInfoLists[j].nodeState;
                    if(status === MachineStatus.RUNNING || status === MachineStatus.NORMAL){
                      instance["machineStatus"] = 1;
                      vmStatusClass = "tl01";
                    }else if(status === MachineStatus.WARNING){
                      instance["machineStatus"] = 2;
                      vmStatusClass = "tl02";
                    }else if(status === MachineStatus.FATAL){
                      instance["machineStatus"] = 3;
                      vmStatusClass = "tl03";
                    }else if(status === MachineStatus.STOPPED || status === MachineStatus.DOWN || status === MachineStatus.FAILED){
                      instance["machineStatus"] = 0;
                      vmStatusClass = "tl05";
                    }else if(status === MachineStatus.DEFECTED){
                      instance["machineStatus"] = -1;
                      vmStatusClass = "tl04";
                    }else{
                      instance["machineStatus"] = -1;
                      vmStatusClass = "tl04";
                    }
                    
                    instance.hostName = vmExtInfoLists[j].hostName;
                    
                    var cssSelect = ".topology_network_vmlist li[id='" + instance.uuid() + "']";
                    var $instance = $(cssSelect);
                    if($instance.hasClass("selected")){
                      $instance.removeClass().addClass(vmStatusClass+" selected");
                    }else{
                      $instance.removeClass().addClass(vmStatusClass);
                    }
                    $instance.find("span#"+instance.uuid()+"_tooltip_cpu").text(vmExtInfoLists[j].cpuSpec+" Core");
                    $instance.find("span#"+instance.uuid()+"_tooltip_memory").text(vmExtInfoLists[j].memSpec+" GB");
                    $instance.find("span#"+instance.uuid()+"_tooltip_disk").text(vmExtInfoLists[j].diskSpec+" GB");
                  }
                }
              }
            }
    
          } else {
            tenant = _tenantInit(data[i], _data.length);
            $.each(tenant.vmExtInfoList, function (i, instance) {
              _instanceInit(instance, window.instanceColor++);
            });
            _data.push(tenant);
            window.tempTenantList.push(tenant);
            var $maxTenant = $("#maxTenant");
            if($maxTenant){
              $maxTenant.text(window.tempTenantList.length);
            }
    
          }
        }else{
          // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
          for(_tenantIdx =0, _tenantMax = _data.length; _tenantIdx < _tenantMax ; _tenantIdx++){
            for(_vmIdx =0, _max = _data[_tenantIdx].vmExtInfoList.length; _vmIdx < _max ; _vmIdx ++){
              if(_data[_tenantIdx].vmExtInfoList[_vmIdx]){
                
                if((typeof instance !== 'undefined') && instance !== undefined && instance !== "undefined" && instance !== null){
                  var vmInfoList = _data[_tenantIdx].vmExtInfoList[_vmIdx];
                  var vmStatusClass = "";
                  var status = vmInfoList.state || vmInfoList.nodeState;
                  instance = _instanceInTenant(_tenant, vmInfoList.id);
                  if(status === MachineStatus.RUNNING || status === MachineStatus.NORMAL){
                    if((typeof instance !== 'undefined')){
                      instance["machineStatus"] = 1;
                    }
                    vmStatusClass = "tl01";
                  }else if(status === MachineStatus.WARNING){
                    if((typeof instance !== 'undefined')){
                      instance["machineStatus"] = 2;
                    }
                    vmStatusClass = "tl02";
                  }else if(status === MachineStatus.FATAL){
                    if((typeof instance !== 'undefined')){
                      instance["machineStatus"] = 3;
                    }
                    vmStatusClass = "tl03";
                  }else if(status === MachineStatus.STOPPED || status === MachineStatus.DOWN || status === MachineStatus.FAILED){
                    if((typeof instance !== 'undefined')){
                      instance["machineStatus"] = 0;
                    }
                    vmStatusClass = "tl05";
                  }else if(status === MachineStatus.DEFECTED){
                    if((typeof instance !== 'undefined')){
                      instance["machineStatus"] = -1;
                    }
                    vmStatusClass = "tl04";
                  }else{
                    if((typeof instance !== 'undefined')){
                      instance["machineStatus"] = -1;
                    }
                    vmStatusClass = "tl04";
                  }
                  // console.log((typeof instance !== 'undefined'), instance);
                  if((typeof instance !== 'undefined')){
                    instance.hostName = vmInfoList.hostName;
                    var cssSelect = ".topology_network_vmlist li[id='" + instance.uuid() + "']";
                    var $instance = $(cssSelect);
                    if($instance.hasClass("selected")){
                      $instance.removeClass().addClass(vmStatusClass+" selected");
                    }else{
                      $instance.removeClass().addClass(vmStatusClass);
                    }
                    $instance.find("span#"+instance.uuid()+"_tooltip_cpu").text(vmInfoList.cpuSpec+" Core");
                    $instance.find("span#"+instance.uuid()+"_tooltip_memory").text(vmInfoList.memSpec+" GB");
                    $instance.find("span#"+instance.uuid()+"_tooltip_disk").text(vmInfoList.diskSpec+" GB");
                  }
                }
              }
            }
          }
        }
      }
    }else{
      var vmExtInfoLists = [];
      var vmExtInfoList, findedAgents, uuid;
      for (i = 0; i < data.length; i++) {

        if(data[i] != null && data[i].vmExtInfoList != null && data[i].vmExtInfoList.length > 0){
          for(_idx = 0, max = data[i].vmExtInfoList.length; _idx < max ; _idx++){
            var vmObject = {};
            vmObject = data[i].vmExtInfoList[_idx];
            vmExtInfoLists.push(vmObject);
          }
  
          var tenant = this.tenant(data[i].id);
          if(!(tenant)){
            tenant = _tenantInit(data[i], _data.length);
            $.each(tenant.vmExtInfoList, function (i, instance) {
              _instanceInit(instance, window.instanceColor++);
            });
            _data.push(tenant);
            window.tempTenantList.push(tenant);
          }
        }
      }
      
      for (j = 0, max = vmExtInfoLists.length; j < max; j++) {
        vmExtInfoList = vmExtInfoLists[j];
        findedAgents = [];
        
        if(_selectStatus === "all"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            findedAgents.push(vmExtInfoLists[_j]);
          }
        }else if(_selectStatus === "running"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED !== status && MachineStatus.DEFECTED !== status && MachineStatus.FAILED !== status && MachineStatus.DOWN !== status){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "stopped"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED === status || MachineStatus.DEFECTED === status || MachineStatus.FAILED === status || MachineStatus.DOWN === status){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "normal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.NORMAL === status){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "warning"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.WARNING === status){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "fatal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.FATAL === status){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }
        
        if (findedAgents.length === 0) {
          
          var uuid = vmExtInfoList.id;
          vmExtInfoLists.splice(j, 1);
          j--;
          max--;
          
          $(".topology_network_vmlist li[id='" + uuid + "']").remove();
        }
      }
      
      for (j = 0, max = _cachedInstanceKeys.length; j < max; j++) {
        uuid = _cachedInstanceKeys[j];
        //findedAgents = _.where(vmExtInfoLists, {'id': uuid});
        findedAgents = [];
        
        if(_selectStatus === "all"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            if(uuid === vmExtInfoLists[_j].id){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "running"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED !== status && MachineStatus.DEFECTED !== status && MachineStatus.FAILED !== status && MachineStatus.DOWN !== status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "stopped"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED === status || MachineStatus.DEFECTED === status || MachineStatus.FAILED === status || MachineStatus.DOWN === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "normal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.NORMAL === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "warning"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.WARNING === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "fatal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.FATAL === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }
        
        if (findedAgents.length === 0) {
          _cachedInstanceKeys.splice(j, 1);
          j--;
          max--;
        }
      }
      
      for (j = 0, max = _cachedSelectedInstanceList.length; j < max; j++) {
        vmExtInfoList = _cachedSelectedInstanceList[j];
        //findedAgents = _.where(vmExtInfoLists, {'id': vmExtInfoList.id});
        findedAgents = [];
        
        if(_selectStatus === "all"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            if(vmExtInfoList.id === vmExtInfoLists[_j].id){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "running"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED !== status && MachineStatus.DEFECTED !== status && MachineStatus.FAILED !== status && MachineStatus.DOWN !== status){
              if(vmExtInfoList.id === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "stopped"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED === status || MachineStatus.DEFECTED === status || MachineStatus.FAILED === status || MachineStatus.DOWN === status){
              if(vmExtInfoList.id === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "normal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.NORMAL === status){
              if(vmExtInfoList.id === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "warning"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.WARNING === status){
              if(vmExtInfoList.id === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "fatal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.FATAL === status){
              if(vmExtInfoList.id === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }
        
        if (findedAgents.length === 0) {
          _cachedSelectedInstanceList.splice(j, 1);
          j--;
          max--;
        }
      }
      
      for (j = 0, max = _cachedSelectedInstanceKeys.length; j < max; j++) {
        uuid = _cachedSelectedInstanceKeys[j];
        //findedAgents = _.where(vmExtInfoLists, {'id': uuid});
        findedAgents = [];
        
        if(_selectStatus === "all"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            if(uuid === vmExtInfoLists[_j].id){
              findedAgents.push(vmExtInfoLists[_j]);
            }
          }
        }else if(_selectStatus === "running"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED !== status && MachineStatus.DEFECTED !== status && MachineStatus.FAILED !== status && MachineStatus.DOWN !== status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "stopped"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.STOPPED === status || MachineStatus.DEFECTED === status || MachineStatus.FAILED === status || MachineStatus.DOWN === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "normal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.NORMAL === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "warning"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.WARNING === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }else if(_selectStatus === "fatal"){
          for(_j=0, _max = vmExtInfoLists.length; _j < _max; _j++) {
            var status = vmExtInfoLists[_j].state || vmExtInfoLists[_j].nodeState;
            if(MachineStatus.FATAL === status){
              if(uuid === vmExtInfoLists[_j].id){
                findedAgents.push(vmExtInfoLists[_j]);
              }
            }
          }
        }
        
        if (findedAgents.length === 0) {
          _cachedSelectedInstanceKeys.splice(j, 1);
          j--;
          max--;
        }
      }
      
      for (j = 0; j < vmExtInfoLists.length; j++) {

        var self = this,
          instance = _instanceInTenant(_data, vmExtInfoLists[j].id);
        if (instance == undefined) {
          instance = vmExtInfoLists[j];
          
          _instanceInit(instance, window.instanceColor++);
          _tenant.vmExtInfoList.push(instance);
          _cachedInstanceKeys.push(instance.id);
          _statusInstance.push(instance);
          if (j > 0) {
            this.makeInstanceBar(instance.id);
          } else {
            this.makeInstanceBar();
          }
        } else {
          var vmStatusClass = "";
          var status = vmExtInfoLists[j].state || vmExtInfoLists[j].nodeState;
          if(status === MachineStatus.RUNNING || status === MachineStatus.NORMAL){
            instance["machineStatus"] = 1;
            vmStatusClass = "tl01";
          }else if(status === MachineStatus.WARNING){
            instance["machineStatus"] = 2;
            vmStatusClass = "tl02";
          }else if(status === MachineStatus.FATAL){
            instance["machineStatus"] = 3;
            vmStatusClass = "tl03";
          }else if(status === MachineStatus.STOPPED || status === MachineStatus.DOWN || status === MachineStatus.FAILED){
            instance["machineStatus"] = 0;
            vmStatusClass = "tl05";
          }else if(status === MachineStatus.DEFECTED){
            instance["machineStatus"] = -1;
            vmStatusClass = "tl04";
          }else{
            instance["machineStatus"] = -1;
            vmStatusClass = "tl04";
          }

          instance.hostName = vmExtInfoLists[j].hostName;
          var keyId = instance.uuid().replace(/\./gi, '');
          var cssSelect = ".topology_network_vmlist li[id='" + keyId + "']";
          var $instance = $(cssSelect);
          
          if($instance.hasClass("selected")){
            $instance.removeClass().addClass(vmStatusClass+" selected");
          }else{
            $instance.removeClass().addClass(vmStatusClass);
          }
          
          $instance.find("span#"+keyId+"_tooltip_cpu").text(vmExtInfoLists[j].cpuSpec+" Core");
          $instance.find("span#"+keyId+"_tooltip_memory").text(vmExtInfoLists[j].memSpec+" GB");
          $instance.find("span#"+keyId+"_tooltip_disk").text(vmExtInfoLists[j].diskSpec+" GB");
        }
      }
    }
    
    _instanceInfo = _searchInstanceListInfo();
  };
  
  this.list = function () {
    return this.instanceList();
  };
  
  this.instanceKeys = function () {
    if (_cachedSelectedInstanceKeys.length > 0) {
      return _cachedSelectedInstanceKeys;
    } else {
      return _cachedInstanceKeys;
    }
  };
  
  this.tenantKeys = function () {
    var keys = [];
    
    var list = this.tenantList();
    for (var i = 0, max = list.length; i < max; i++) {
      keys.push(list[i].key());
    }
    
    return keys;
  };
  
  this.keys = function () {
    if (_cachedSelectedInstanceKeys.length > 0) {
      return _cachedSelectedInstanceKeys;
    } else {
      return _cachedInstanceKeys;
    }
  };
  
  this.instance = function (uuid) {
    if (!_isStatus) {
      return _instanceInTenant(_tenant, uuid);
    } else {
      return _instanceInTenant(_data, uuid);
    }
    
  };
  
  this.tenant = function (tenantId) {
    if (_.isUndefined(_data)) {
      return undefined;
    }
    
    if (_.isUndefined(tenantId)) {
      return _tenant;
    }
    
    for (var i = 0; i < _data.length; i++) {
      if (_data[i].id === tenantId) {
        return _data[i];
      }
    }
    
    return undefined;
  };
  
  this.findAgentByHost = function (hostId) {
    var instanceList = [],
      list = this.instanceList();
    
    $.each(list, function (index, instance) {
      if (hostId == instance.host() && !instance.isHost()) {
        instanceList.push(instance);
      }
    });
    
    return instanceList;
  };
  
  this.currentTenantId = function () {
    var tenantIdArr = [];
    if (!_tenant) {
      return [];
    }
    tenantIdArr.push(_tenant.id);
    
    return tenantIdArr;
  };
  
  this.currentStatus = function () {
    var statusArr = [];
    statusArr.push(_selectStatus);
    return statusArr;
  };
  
  this.multiTenantId = function () {
    var tenantIdArr = [];
    
    if (_.isUndefined(_data)) {
      return [];
    }
    
    $.each(_data, function (index, tenant) {
      tenantIdArr.push(tenant.id);
    });
    
    return tenantIdArr;
  };
  
  this.instanceList = function () {
    var selectedList = [];
    if (!_isStatus) {
      if (_tenant && _tenant.vmExtInfoList) {
        if (_cachedSelectedInstanceList.length > 0) {
          return _cachedSelectedInstanceList;
        } else {
          return _tenant.vmExtInfoList;
        }
      } else {
        selectedList = [];
        $.each(_data, function (i, tenant) {
          if (tenant.selected) {
            $.each(tenant.vmExtInfoList, function (index, obj) {
              obj.tenantId = tenant.tenantId;
              selectedList.push(obj);
            });
          }
        });
        return selectedList;
      }
    } else {
      return _statusInstance
    }
    
  };
  
  this.selectedInstanceUuids = function () {
    return _cachedSelectedInstanceKeys;
  };
  
  this.fixedInstanceList = function (tenant) {
    if (tenant) {
      return filterInstance(tenant.agent);
    } else {
      return (!_tenant || !_tenant.agent) ? [] : filterInstance(_tenant.agent);
    }
  };
  
  this.isSelectedInstance = function () {
    if (!_tenant) {
      return false;
    }
    
    var agents = _tenant.vmExtInfoList;
    for (var i = 0; i < agents.length; i++) {
      if (agents[i].selected && agents[i].instId > 0) {
        return true;
      }
    }
    
    
    return false;
  };
  
  this.selectedInstanceCount = function () {
    if (!_tenant) {
      return false;
    }
    var count = 0;
    $.each(_tenant.agent, function (index, obj) {
      if (obj.selected && obj.instId > 0) {
        count++;
      }
    });
    
    return count;
  };
  
  this.tenantList = function () {
    var selectedList = [];
    
    if (_.isUndefined(_data)) {
      return [];
    }
    
    $.each(_data, function (index, tenant) {
      if (tenant.selected) {
        selectedList.push(tenant);
      }
    });
    
    if (selectedList.length > 0) {
      return selectedList;
    } else {
      return _data;
    }
  };
  
  this.selectedTenantList = function () {
    var selectedList = [];
    $.each(_data, function (index, tenant) {
      if (tenant.selected) {
        selectedList.push(tenant);
      }
    });
    
    return selectedList;
  };
  
  this.selectedTenantIds = function () {
    var selectedTenantIds = [];
    $.each(_data, function (index, tenant) {
      if (tenant.selected) {
        selectedTenantIds.push(tenant.tenantId);
      }
    });
    
    return selectedTenantIds;
  };
  
  this.emitInstanceSelect = function (uuid) {
    
    if (!_isStatus) {
      if (!_tenant || !_tenant.vmExtInfoList) {
        return false;
      }
      
      _cachedSelectedInstanceList = [];
      _cachedSelectedInstanceKeys = [];
      $.each(_tenant.vmExtInfoList, function (index, obj) {
        
        if (obj.uuid() === uuid) {
          obj.selected = !obj.selected;
        }
        
        if (obj.selected) {
          _cachedSelectedInstanceList.push(obj);
          _cachedSelectedInstanceKeys.push(obj.key());
        }
      });
    } else {
      if (!_data || _data.length == 0) {
        return false;
      }
      
      _cachedSelectedInstanceList = [];
      _cachedSelectedInstanceKeys = [];
      $.each(_statusInstance, function (index, instance) {
        if (instance.uuid() === uuid) {
          instance.selected = !instance.selected;
        }
        
        if (instance.selected) {
          _cachedSelectedInstanceList.push(instance);
          _cachedSelectedInstanceKeys.push(instance.key());
        }
      });
    }
    
    
    if (_handler) {
      _handler();
    }
    
    instanceSelectHandlers();
  };
  
  this.emitTenantSelect = function (tenantId) {
    _isStatus = false;
    selectSingleTenant(tenantId);
    if (_handler) {
      _handler();
    }
    
    tenantSelectHandlers();
  };
  
  this.emitStatusSelect = function (status) {
    _isStatus = true;
    _selectStatus = status;
    selectSingleTenant(status);
    if (_handler) {
      _handler();
    }
    
    tenantSelectHandlers();
  };
  
  this.isStatus = function () {
    return _isStatus;
  };
  
  this.selectStatus = function () {
    return _selectStatus;
  };
  
  this.createInstance = function (obj, i) {
    _instanceInit(obj, i);
    return obj;
  };
  
  this.existInstance = function (tenantId, uuid) {
    var exist = false;
    $.each(_data, function (index, tenant) {
      if (tenant.tenantId === tenantId) {
        $.each(tenant.agent, function (index, instance) {
          if (instance.uuid() === uuid) {
            exist = true;
          }
        });
      }
    });
    
    return exist;
  };
  
  this.handler = function (handler) {
    if (handler) {
      _handler = handler;
    }
    
    return this;
  };
  
  this.instanceSelectHandlers = function (handler) {
    if (handler) {
      _instanceSelectHandlers.push(handler);
    } else {
      for (var i = 0, max = _instanceSelectHandlers.length; i < max; i++) {
        _instanceSelectHandlers[i]();
      }
    }
  };
  
  this.tenantSelectHandlers = function (handler) {
    if (handler) {
      _tenantSelectHandlers.push(handler);
    } else {
      for (var i = 0, max = _tenantSelectHandlers.length; i < max; i++) {
        _tenantSelectHandlers[i]();
      }
    }
  };
  
  function _searchInstanceListInfo() {
    var info = {};
    
    var
      totalCount = 0,
      runningCount = 0,
      normalCount = 0,
      warningCount = 0,
      fatalCount = 0,
      stopCount = 0,
      defectCount = 0;
    
    if (!_.isUndefined(_tenant)) {
      $.each(_tenant.vmExtInfoList, function (index, obj) {
        if (obj.isRunning()) {
          runningCount++;
          
          if (obj.isNormal()) {
            normalCount++;
          } else if (obj.isWarning()) {
            warningCount++;
          } else if (obj.isFatal()) {
            fatalCount++;
          }
          
        } else if (obj.isDefected()) {
          defectCount++;
        } else if (obj.isStopped()) {
          stopCount++;
        }
      });
      totalCount = _tenant.vmExtInfoList.length;
    }
    
    info.total = totalCount;
    info.running = runningCount;
    info.normal = normalCount;
    info.warning = warningCount;
    info.fatal = fatalCount;
    info.stop = stopCount;
    info.defect = defectCount;
    
    return info;
  }
  
  this.getInstanceListInfo = function () {
    _instanceInfo = _searchInstanceListInfo();
    
    return _instanceInfo;
  };
  
  this.makeInstanceBar = function (uuid, callback) {
    var tenantBarListBar = ".topology_network_vmlist";
    var $instance_bar = $(tenantBarListBar);
    
    var index = -1;
    if (_.isUndefined(_tenant)) {
      return;
    }
    var currentTenant = _.findWhere(_data, {id: _tenant.id});
    var agents = currentTenant.vmExtInfoList;
    if (!_.isUndefined(uuid)) {
      for (var i = 0, max = agents.length; i < max; i++) {
        if (agents[i].uuid() === uuid) {
          index = i;
          break;
        }
      }
      
      if (index === -1) {
        return;
      }
    }
    var findIndex = index;
    if (findIndex > agents.length - 1) {
      return;
    }
    for (_machineIdx = 0; _machineIdx < currentTenant.vmExtInfoList.length; _machineIdx++) {
      
      if(!_.isUndefined(uuid)){
        var machineObject = currentTenant.vmExtInfoList[_machineIdx];
        if(uuid === machineObject.id){
          var status = machineObject.state || machineObject.nodeState;
          $instance_bar.append(monitoringUtils.makeMachineHtml(machineObject.id, machineObject.hostName, machineObject.hostName, status, "server", 0, machineObject.memSize, machineObject.diskSize, undefined, machineObject.id));
        }
      }else{
        var machineObject = currentTenant.vmExtInfoList[_machineIdx];
        var status = machineObject.state || machineObject.nodeState;
        $instance_bar.append(monitoringUtils.makeMachineHtml(machineObject.id, machineObject.hostName, machineObject.hostName, status, "server", 0, machineObject.memSize, machineObject.diskSize, undefined, machineObject.id));
      }
    }
    
    if (typeof(callback) == "function") {
      if (findIndex == agents.length - 1) {
        callback();
      }
    }
  };
  
  this.makeInstanceBarWithStatus = function () {
    var tenantBarListBar = ".topology_network_vmlist";
    var $instance_bar = $(tenantBarListBar);
    if (!_.isUndefined(_statusInstance) && _statusInstance.length > 0) {
      for (_machineIdx = 0; _machineIdx < _statusInstance.length; _machineIdx++) {
        var machineObject = _statusInstance[_machineIdx];
        var status = machineObject.state || machineObject.nodeState;
        $instance_bar.append(monitoringUtils.makeMachineHtml(machineObject.id, machineObject.hostName, machineObject.hostName, status, "server", 0, machineObject.memSize, machineObject.diskSize, undefined, machineObject.id));
      }
    }
  };
  
  this.moreHeightSizeHandler = function (callback) {
    
    if (callback) {
      _moreHeightSizeHandler = callback;
    } else {
      var height = 0;
      _moreHeightSizeHandler(height);
      defineChartPositionSize();
    }
  };
  
  return {
    init: init,
    currentTenantId: currentTenantId,
    currentStatus: currentStatus,
    multiTenantId: multiTenantId,
    tenant: tenant,
    instance: instance,
    instanceKeys: instanceKeys,
    tenantKeys: tenantKeys,
    list: list,
    keys: keys,
    tenantList: tenantList,
    selectedTenantList: selectedTenantList,
    selectedTenantIds: selectedTenantIds,
    instanceList: instanceList,
    selectedInstanceUuids: selectedInstanceUuids,
    getInstanceListInfo: getInstanceListInfo,
    callback: callback,
    findAgentByHost: findAgentByHost,
    isSelectedInstance: isSelectedInstance,
    fixedInstanceList: fixedInstanceList,
    emitInstanceSelect: emitInstanceSelect,
    emitTenantSelect: emitTenantSelect,
    emitStatusSelect: emitStatusSelect,
    isStatus: isStatus,
    selectStatus: selectStatus,
    createInstance: createInstance,
    existInstance: existInstance,
    selectedInstanceCount: selectedInstanceCount,
    makeInstanceBar: makeInstanceBar,
    makeInstanceBarWithStatus: makeInstanceBarWithStatus,
    moreHeightSizeHandler: moreHeightSizeHandler,
    handler: handler,
    instanceSelectHandlers: instanceSelectHandlers,
    tenantSelectHandlers: tenantSelectHandlers
  };
}());
vics.manager = vics.manager || {};
vics.chart.color = (function () {
  var color = new Color(),
    
    newColor = function (size) {
      var m = (size % 20),
        addition = parseInt(size / 20) | 0;
      switch (m) {
        case 0:
          color = new Color(121, 119 - addition, 194);
          break;
        case 1:
          color = new Color(123, 186 - addition, 231);
          break;
        case 2:
          color = new Color(255, 192 - addition, 0);
          break;
        case 3:
          color = new Color(255, 120 - addition, 0);
          break;
        case 4:
          color = new Color(135, 187 - addition, 102);
          break;
        case 5:
          color = new Color(29, 168 - addition, 160);
          break;
        case 6:
          color = new Color(146, 146 - addition, 146);
          break;
        case 7:
          color = new Color(85, 93 - addition, 105);
          break;
        case 8:
          color = new Color(2, 152 - addition, 213);
          break;
        case 9:
          color = new Color(250, 85 - addition, 89);
          break;
        case 10:
          color = new Color(245, 163 - addition, 151);
          break;
        case 11:
          color = new Color(6, 217 - addition, 182);
          break;
        case 12:
          color = new Color(168, 169 - addition, 217);
          break;
        case 13:
          color = new Color(110, 106 - addition, 252);
          break;
        case 14:
          color = new Color(227, 231 - addition, 104);
          break;
        case 15:
          color = new Color(197, 123 - addition, 195);
          break;
        case 16:
          color = new Color(223, 50 - addition, 139);
          break;
        case 17:
          color = new Color(150, 215 - addition, 235);
          break;
        case 18:
          color = new Color(131, 156 - addition, 181);
          break;
        case 19:
          color = new Color(146, 40 - addition, 228);
          break;
      }
      
      return color;
    };
  
  return {
    newColor: newColor
  }
  
}(vics));

vics.chart.util = {
  extend: function (exTendObj, superObj) {
    for (key in superObj.prototype) {
      if (_.isUndefined(exTendObj.prototype[key])) {
        exTendObj.prototype[key] = superObj.prototype[key];
      }
    }
  }
};
vics.chart.basic = function (divDom, model, drawPeriod) {
  
  this.bufferArea = document.createElement('canvas').getContext('2d');
  this.chartArea = jQuery(divDom).children('canvas')[0].getContext('2d');
  this.listenerArea = jQuery(divDom).children('canvas')[1].getContext('2d');
  this.chartType = jQuery(divDom).attr("chartType");
  this.title = jQuery(this.chartArea.canvas).attr("chartTitle");
  this.valueMax = 0;
  this.max = 0;
  this.axisMax = 0;
  this.axisMin = 0;
  this.fixedMax = 0;
  this.defaultMax = 1;
  this.isAuto = true;
  this.range = 0;
  this.warningCritical = 20.0;
  this.fatalCritical = 80.0;
  
  if (model) {
    model.chart = this;
  }
  
  if (model instanceof vics.chart.model.modelgroup) {
    this.modelGroup = model;
  } else {
    this.model = model;
  }
  this.DEFAULT_TOP_PADDING = 25;
  this.width = this.chartArea.canvas.clientWidth;
  this.height = this.chartArea.canvas.clientHeight;
  this.leftPadding = 18;
  this.bottomPadding = 20;
  this.rightPadding = 10;
  this.topPadding = this.DEFAULT_TOP_PADDING;
  
  if (drawPeriod) {
    this.drawPeriod = drawPeriod + Math.floor(isaacCSPRNG().random() * drawPeriod);
  } else {
    this.drawPeriod = 0;
  }
  
  this.previousTime = 0;
  this.titleLayout = 1;
  this.currentTime;
  this.useBottomLabel = false;
  this.tpf = 0;
  this.animationId;
  this.legends = [];
  this.legendsChecked;
  this.agentHandler;
  
  vics.on('stopCharts', function () {this.stopPaint();}, this);
  
  vics.on('startCharts', function () {this.paint();}, this);
};
vics.chart.basic.prototype = {
  
  getBaseUnitValue: function () {
    return 1024 || 1000;
  },
  
  handlerAgent: function (agentHandler) {
    if (agentHandler) {
      this.agentHandler = agentHandler;
    }
  },
  
  getModel: function () {
    if (this.model) {
      return this.model;
    } else if (this.modelGroup) {
      return this.modelGroup;
    }
  },
  
  getBottomPadding: function () {
    return this.bottomPadding;
  },
  
  paint: function () {
    this.currentTime = Date.now();
    
    if (this.currentTime - this.previousTime > this.drawPeriod || this.drawPeriod == 0) {
      this.tpf = (this.currentTime - this.previousTime) / 1000;
      if (this.tpf > 1) {
        this.tpf = 1;
      }
      this.fps = (1.0 / this.tpf);
      this.paintChart();
      this.previousTime = this.currentTime;
    }
    
    if (this.drawPeriod > 0) {
      var that = this;
      this.animationId = window.requestAniFrame(function () {that.paint()});
    }
    
    if (this.drawPeriod > 0 && !this.animationFunc) {
      this.animationFunc = vics.on('requestAniFrame', function () {this.paint();}, this);
    }
  },
  
  stopPaint: function () {
    var that = this;
    if (that.animationFunc) {
      vics.off('requestAniFrame', that.animationFunc);
      window.cancelAniFrame(that.animationId);
      that.animationFunc = undefined;
    }
  },
  
  paintBackground: function () {
    var devicePixelRatio = window.devicePixelRatio || 1;
    
    if (this.chartArea.canvas.parentNode && (this.chartArea.canvas.width != this.chartArea.canvas.clientWidth * devicePixelRatio || this.chartArea.canvas.height != this.chartArea.canvas.clientHeight * devicePixelRatio)) {
      this.chartArea.canvas.width = devicePixelRatio * this.chartArea.canvas.clientWidth;
      this.chartArea.canvas.height = devicePixelRatio * this.chartArea.canvas.clientHeight;
      
      this.bufferArea.canvas.width = devicePixelRatio * this.chartArea.canvas.clientWidth;
      this.bufferArea.canvas.height = devicePixelRatio * this.chartArea.canvas.clientHeight;
      
      this.listenerArea.canvas.width = devicePixelRatio * this.chartArea.canvas.clientWidth;
      this.listenerArea.canvas.height = devicePixelRatio * this.chartArea.canvas.clientHeight;
      
      this.width = this.chartArea.canvas.clientWidth;
      this.height = this.chartArea.canvas.clientHeight;
      
      this.bufferArea.scale(devicePixelRatio, devicePixelRatio);
      this.listenerArea.scale(devicePixelRatio, devicePixelRatio);
      
      this.listenerArea.clearRect(0, 0, this.width, this.height);
    }
    
    this.bufferArea.clearRect(0, 0, this.width, this.height);
  },
  
  paintClear: function () {
    this.chartArea.clearRect(0, 0, this.chartArea.canvas.width, this.chartArea.canvas.height);
  },
  
  paintChart: function () {
    var
      _chartArea = this.chartArea,
      _bufferArea = this.bufferArea;
    
    
    if (this.model || this.modelGroup) {
      this.configMax();
    }
    
    this.paintBackground();
    
    //for Firefox
    if (_bufferArea.canvas.width * _bufferArea.canvas.height === 0) {
      return;
    }
    
    
    if (this.leftRenderer) {
      this.leftPadding = this.leftRenderer.getWidth(this.getMax());
    }
    
    if (this.bottomRenderer) {
      this.bottomPadding = this.bottomRenderer.getHeight();
    }
    
    if (this.useBottomLabel) {
      this.bottomPadding += 20;
    }
    
    if (this.titleLayout == 2) {
      this.bottomPadding += 20;
      this.topPadding = this.DEFAULT_TOP_PADDING - 20;
    }
    
    if (this.bottomRenderer) {
      this.bottomRenderer.paint();
    }
    
    if (this.leftRenderer) {
      this.leftRenderer.paint();
    }
    
    if (this.legendRenderer) {
      this.legendRenderer.paint();
    } else if (this.title && this.title !== 'null') {
      if (this.titleLayout == 2) {
        _bufferArea.textBaseline = 'top';
        _bufferArea.textAlign = 'center';
        _bufferArea.fillStyle = CanvasChartStyle.title_color;
        _bufferArea.font = VicsFont.getFont(12, "bold");
        
        _bufferArea.fillText('<' + this.title + '>', this.width / 2, this.height - 20);
      } else {
        _bufferArea.textBaseline = 'top';
        _bufferArea.textAlign = 'left';
        _bufferArea.fillStyle = CanvasChartStyle.title_color;
        _bufferArea.font = VicsFont.getFont(12, "bold");
        
        var x = 12;
        if ((this.mouseListener && this.mouseListener.isViewSlide) || this.isRealTimeView) {
          x += 16;
        }
        _bufferArea.fillText(this.title, x, 10);
      }
    }
    
    this.paintContent();
    
    this.paintClear();
    
    _chartArea.drawImage(_bufferArea.canvas, 0, 0);
  },
  
  renderPointValue: function (value, x, y, pointColor) {
    this.bufferArea.beginPath();
    this.bufferArea.lineWidth = 1;
    this.bufferArea.fillStyle = pointColor;
    this.bufferArea.strokeStyle = CanvasChartStyle.render_point_value_circle_stroke;
    this.bufferArea.arc(x, y, 4, 0, ClientUtilities.PI2, false);
    this.bufferArea.closePath();
    this.bufferArea.fill();
    this.bufferArea.stroke();
    
    this.bufferArea.font = VicsFont.getFont(11, "bold");
    var strWidth = this.bufferArea.measureText(value).width;
    var strX = x - strWidth * 0.5;
    if (strX < this.leftPadding + 3) {
      strX = this.leftPadding + 3;
    }
    
    this.bufferArea.fillStyle = CanvasChartStyle.render_point_value_text_color;
    
    this.bufferArea.textBaseline = "middle";
    this.bufferArea.textAlign = 'left';
    
    this.bufferArea.fillText(value, strX, y - 11);
  },
  
  getMax: function () {
    var max;
    
    if (this.isAuto) {
      max = this.max;
    } else {
      max = this.axisMax;
    }
    return max;
  },
  
  getMin: function () {
    var min;
    
    if (this.isAuto) {
      min = 0;
    } else {
      min = this.axisMin;
    }
    
    return min;
  },
  
  setFixedMax: function (fixedMax) {
    this.fixedMax = fixedMax;
  },
  
  setDefaultMax: function (defaultMax) {
    this.defaultMax = defaultMax;
  },
  
  configMax: function () {
    if (this.modelGroup) {
      this.valueMax = this.modelGroup.getMax();
    } else {
      this.valueMax = this.model.getMax();
    }
    
    this.max = ClientUtilities.getMaxValue(this.valueMax);
    
    if (this.defaultMax > this.max) {
      this.max = this.defaultMax;
    }
    
    if (this.fixedMax > 0) {
      this.max = this.fixedMax;
    }
    
    if (this.isAuto) {
      this.axisMin = 0;
      this.axisMax = this.max;
    }
  },
  
  setWarningCritical: function(warningCritical){
    this.warningCritical = warningCritical;
  },
  
  getWarningCritical: function(){
    return this.warningCritical;
  },
  
  setFatalCritical: function(fatalCritical){
    this.fatalCritical = fatalCritical;
  },
  
  getFatalCritical: function(){
    return this.fatalCritical;
  }
};
vics.chart.equalizer = function (divDom, model) {
  vics.chart.basic.apply(this, [divDom, model, 100]);
  
  this.UNIT_HEIGHT = 4;
  this.SPACE_HEIGHT = 1;
  this.SPACE_WIDTH = 4;
  
  this.isHost = false;
  
  this.mouseListener = new vics.chart.eventlistener.equalizer(this);
  this.bottomRenderer = new vics.chart.bottomrenderer.agents(this);
  this.leftRenderer = new vics.chart.leftrenderer(this);
  this.leftRenderer.setFillArea(false);
  this.legendRenderer = new vics.chart.legendrenderer(this);
  
  this.MOTION_HEIGHT = 9;
  this.MOTION_VELOCITY = 1.5;
  this.positionMap = new Map();
  this.isUpMap = new Map();
  
  this.unitTopColors = CanvasChartStyle.eq_normal_emboss_colors;
  this.unitBottomColors = CanvasChartStyle.eq_normal_intaglio_colors;
  this.colors = this.unitTopColors;
};
vics.chart.equalizer.prototype = {
  paintContent: function () {
    var
      width = this.width - this.leftPadding - this.rightPadding,
      height = this.height - this.topPadding - this.bottomPadding,
      bufferArea = this.bufferArea,
      modelWidth;
    
    var keys = this.getModel().getKeys();
    var countOfModel = keys.length;
    var modelWidth;
    if (countOfModel == 1) {
      modelWidth = ((width / 2) | 0) - this.SPACE_WIDTH;
    } else {
      modelWidth = ((width / countOfModel) | 0) - this.SPACE_WIDTH;
    }
    
    var
      x,
      motionIndex,
      sum,
      equilizerUnit;
    
    var width_count_model = width / countOfModel;
    var height_padding = this.height - this.bottomPadding;
    var height_minus_14 = height_padding - 14;
    var heightSum = this.UNIT_HEIGHT + this.SPACE_HEIGHT;
    var _max = this.getMax();
    
    var bgColors = CanvasChartStyle.eq_bg_colors;
    var gradient = bufferArea.createLinearGradient(0, this.topPadding, 0, height_padding);
    gradient.addColorStop(0, bgColors[0]);
    gradient.addColorStop(1, bgColors[1]);
    
    for (var i = 0; i < countOfModel; i++) {
      var agent = this.getModel().getAgentByKey(keys[i]);
      if (_.isUndefined(agent)) {
        continue;
      }
      
      x = this.leftPadding + ((i * width_count_model + width_count_model / 2) | 0);
      
      motionIndex = -1;
      sum = 0;
      equilizerUnit = this.model.getValue(keys[i]);
      if (agent.isDefected()) {
        bufferArea.font = VicsFont.getFont(11);
        bufferArea.textBaseline = 'middle';
        bufferArea.textAlign = 'left';
        bufferArea.fillStyle = CanvasChartStyle.eq_defected_bg_color;
        bufferArea.roundBar((x - 9), height_padding - 60, (x + 9), height_minus_14, 3);
        bufferArea.fill();
        bufferArea.beginPath();
        bufferArea.moveTo(x - 9, height_minus_14);
        bufferArea.lineTo(x + 9, height_minus_14);
        bufferArea.lineTo(x, height_padding - 6);
        bufferArea.fill();
        bufferArea.save();
        bufferArea.translate(x, height_padding - 55);
        bufferArea.rotate(ClientUtilities.HALF_PI);
        bufferArea.fillStyle = CanvasChartStyle.eq_defected_text_color;
        
        bufferArea.shadowOffsetY = 1;
        bufferArea.shadowBlur = 0;
        bufferArea.shadowColor = CanvasChartStyle.eq_defected_text_shadow_color;
        
        bufferArea.fillText("Defected", 0, 0);
        bufferArea.restore();
      } else if (agent.isStopped()) {
        bufferArea.font = VicsFont.getFont(11);
        bufferArea.textBaseline = 'middle';
        bufferArea.textAlign = 'left';
        bufferArea.fillStyle = CanvasChartStyle.eq_stopped_bg_color;
        bufferArea.roundBar((x - 9), height_padding - 60, (x + 9), height_minus_14, 3);
        bufferArea.fill();
        bufferArea.beginPath();
        bufferArea.moveTo(x - 9, height_minus_14);
        bufferArea.lineTo(x + 9, height_minus_14);
        bufferArea.lineTo(x, height_padding - 6);
        bufferArea.fill();
        bufferArea.save();
        bufferArea.translate(x, height_padding - 55);
        bufferArea.rotate(ClientUtilities.HALF_PI);
        bufferArea.fillStyle = CanvasChartStyle.eq_stopped_text_color;
        
        bufferArea.shadowOffsetY = 1;
        bufferArea.shadowBlur = 0;
        bufferArea.shadowColor = CanvasChartStyle.eq_stopped_text_shadow_color;
        
        bufferArea.fillText("Stopped", 0, 0);
        bufferArea.restore();
      } else if (agent.isFailed()) {
        bufferArea.font = VicsFont.getFont(11);
        bufferArea.textBaseline = 'middle';
        bufferArea.textAlign = 'left';
        bufferArea.fillStyle = CanvasChartStyle.eq_stopped_bg_color;
        bufferArea.roundBar((x - 9), height_padding - 60, (x + 9), height_minus_14, 3);
        bufferArea.fill();
        bufferArea.beginPath();
        bufferArea.moveTo(x - 9, height_minus_14);
        bufferArea.lineTo(x + 9, height_minus_14);
        bufferArea.lineTo(x, height_padding - 6);
        bufferArea.fill();
        bufferArea.save();
        bufferArea.translate(x, height_padding - 55);
        bufferArea.rotate(ClientUtilities.HALF_PI);
        bufferArea.fillStyle = CanvasChartStyle.eq_stopped_text_color;
        
        bufferArea.shadowOffsetY = 1;
        bufferArea.shadowBlur = 0;
        bufferArea.shadowColor = CanvasChartStyle.eq_stopped_text_shadow_color;
        
        bufferArea.fillText("Failed", 0, 0);
        bufferArea.restore();
      }else if (equilizerUnit && agent.isRunning()) {
        var unitValue = equilizerUnit.getValues();
        if (this.isHost) {
          bufferArea.fillStyle = gradient;
          
          for (var y = theight_padding; y >= this.topPadding; y -= heightSum) {
            bufferArea.fillRect(x + ((-modelWidth / 2) | 0), y - this.UNIT_HEIGHT, modelWidth, this.UNIT_HEIGHT);
          }
        } else if (typeof equilizerUnit.max != 'undefined') {
          var max = 0;
          if (equilizerUnit.max < unitValue) {
            max = unitValue;
          } else {
            max = equilizerUnit.max;
          }
          
          bufferArea.fillStyle = gradient;
          
          var condition = this.topPadding + height * ((_max - max) / _max);
          for (var y = height_padding; y >= condition; y -= heightSum) {
            bufferArea.fillRect(x + ((-modelWidth / 2) | 0), y - this.UNIT_HEIGHT, modelWidth, this.UNIT_HEIGHT);
          }
        }
        
        if (this.agentHandler.selectedAgent()) {
          if (this.agentHandler.selectedAgent().key() === keys[i]) {
            bufferArea.globalAlpha = 1;
          } else {
            if (!this.isHost) {
              bufferArea.globalAlpha = 0.3;
            }
          }
        } else {
          bufferArea.globalAlpha = 1;
        }
        
        var eqCount = 0;
        if (this.getMax() > 0) {
          eqCount = Math.round(height * (unitValue / this.getMax()) / heightSum);
          if (eqCount == 0 && unitValue > 0) {
            eqCount = 1;
          }
        }
        
        var index = 0;
        var maxData = 0;
        var fixedSection = this.getMax()*(this.getWarningCritical()/this.getMax());
        var colorIdx = 0;
        
        for (j = 0; j < eqCount; j++) {
          if(((j+1)/eqCount * 100 < (this.getWarningCritical()+1)) || unitValue < (this.getWarningCritical()+1) || j == 0){
            if (motionIndex === -1) {
              motionIndex = 0;
            }
            index = 0;
          } else {
            if(((j+1)/eqCount * 100 > (this.getFatalCritical()+1)) && (unitValue >= (this.getFatalCritical()+1))){
              motionIndex = index = 2;
            }else{
              motionIndex = index = 1;
            }
          }
          this.renderEqualizerUnit(x, height_padding - (heightSum) * (j + 1), modelWidth, index);
        }
        
        var currentPosition = height_padding - heightSum * eqCount;
        var _uuid = keys[i];
        if (!this.positionMap.get(_uuid) && !this.isUpMap.get(_uuid)) {
          this.positionMap.put(_uuid, currentPosition);
          this.isUpMap.put(_uuid, true);
        } else {
          if (this.isUpMap.get(_uuid)) {
            var position = this.positionMap.get(_uuid) - this.MOTION_VELOCITY * (this.positionMap.get(_uuid) + 20 - currentPosition) * this.tpf;
            
            var minHeight = currentPosition - this.MOTION_HEIGHT;
            if (position < minHeight) {
              position = minHeight;
              this.isUpMap.put(_uuid, false);
            }
            
            this.positionMap.put(_uuid, position);
          } else {
            var position = this.positionMap.get(_uuid) + this.MOTION_VELOCITY * this.tpf * 25;
            
            if (position > this.height - this.bottomPadding - heightSum * eqCount) {
              position = this.height - this.bottomPadding - heightSum * eqCount;
              this.isUpMap.put(_uuid, true);
            }
            
            this.positionMap.put(_uuid, position);
          }
        }
        
        if (eqCount > 0) {
          var bufferArea = this.bufferArea;
          var minus_width_half = -modelWidth / 2;
          var _y = (((this.positionMap.get(_uuid)) | 0)) - this.UNIT_HEIGHT;
          
          bufferArea.lineWidth = 1;
          
          bufferArea.strokeStyle = this.unitTopColors[motionIndex];
          bufferArea.beginPath();
          bufferArea.moveTo(x + ((minus_width_half) | 0), _y + 0.5);
          bufferArea.lineTo(x + ((minus_width_half + modelWidth) | 0), _y + 0.5);
          bufferArea.closePath();
          bufferArea.stroke();
          
          bufferArea.strokeStyle = this.unitBottomColors[motionIndex];
          bufferArea.beginPath();
          bufferArea.moveTo(x + ((minus_width_half) | 0), _y + 1.5);
          bufferArea.lineTo(x + ((minus_width_half + modelWidth) | 0), _y + 1.5);
          bufferArea.closePath();
          bufferArea.stroke();
          
          bufferArea.fillStyle = CanvasChartStyle.eq_count_text_color;
          bufferArea.font = VicsFont.getFont(11, "bold");
          bufferArea.textAlign = 'center';
          bufferArea.textBaseline = 'middle';
          bufferArea.fillText(unitValue.toLocaleForVics(), x, this.positionMap.get(_uuid) - 13);
        }
      }
      
      bufferArea.globalAlpha = 1;
      bufferArea.lineWidth = 2;
      bufferArea.beginPath();
      bufferArea.fillStyle = CanvasChartStyle.bottom_axis_circle_color;
      bufferArea.strokeStyle = CanvasChartStyle.bottom_axis_circle_stroke;
      bufferArea.arc(x, this.height - this.bottomPadding, 4, 0, ClientUtilities.PI2, false);
      bufferArea.closePath();
      bufferArea.stroke();
      bufferArea.fill();
    }
  },
  renderEqualizerUnit: function (x, y, width, index) {
    var bufferArea = this.bufferArea;
    var minus_width_half = -width / 2;
    var _y = y - this.UNIT_HEIGHT;
    
    bufferArea.lineWidth = 2;
    
    bufferArea.strokeStyle = this.unitTopColors[index];
    bufferArea.beginPath();
    bufferArea.moveTo(x + (minus_width_half | 0), _y - 2);
    bufferArea.lineTo(x + ((minus_width_half + width) | 0), _y - 2);
    bufferArea.closePath();
    bufferArea.stroke();
    
    bufferArea.strokeStyle = this.unitBottomColors[index];
    bufferArea.beginPath();
    bufferArea.moveTo(x + (minus_width_half | 0), _y);
    bufferArea.lineTo(x + ((minus_width_half + width) | 0), _y);
    bufferArea.closePath();
    bufferArea.stroke();
  }
};
vics.chart.util.extend(vics.chart.equalizer, vics.chart.basic);
vics.chart.line = function (divDom, model) {
};
vics.chart.util.extend(vics.chart.line, vics.chart.basic);
vics.chart.line.runtime = function (divDom, model) {
  vics.chart.basic.apply(this, [divDom, model, ClientUtilities.TWO_SECONDS]);
  
  this.drawPeriod = ClientUtilities.TWO_SECONDS;
  this.isZeroLineRender = false;
  this.isFillArea = false;
  this.isSetHighValue = false;
  this.isRenderHighValue = false;
  this.range = ClientUtilities.ONE_MINUTE * 5;
  this.mouseListener = new vics.chart.eventlistener.line.runtime(this);
  this.bottomRenderer = new vics.chart.bottomrenderer.runtime(this);
  this.leftRenderer = new vics.chart.leftrenderer(this);
  this.leftRenderer.setFillArea(true);
};
vics.chart.line.runtime.prototype = {
  getRange: function () {
    return this.range;
  },
  
  paintContent: function () {
    var
      _bufferArea = this.bufferArea,
      _leftPadding = this.leftPadding,
      _topPadding = this.topPadding,
      _rightPadding = this.rightPadding,
      _bottomPadding = this.bottomPadding,
      _width = this.width,
      _height = this.height,
      _leftRendererTopPadding = this.leftRenderer.TOP_PADDING;
    
    this.isZeroLineRender = false;
    this.isSetHighValue = false;
    this.isRenderHighValue = false;
    _bufferArea.save();
    _bufferArea.beginPath();
    _bufferArea.rect(_leftPadding, _topPadding - _leftRendererTopPadding - 10, _width - _leftPadding - _rightPadding, _height - _topPadding - _bottomPadding + _leftRendererTopPadding + 10);
    _bufferArea.clip();
    var keys = this.modelGroup.getKeys();
    for (var i = 0, len = keys.length; i < len; i++) {
      var model = this.modelGroup.getRuntimeLineModel(keys[i]);
      if (this.agentHandler && this.agentHandler.selectedAgent() && this.agentHandler.selectedAgent().uuid() == model.getAgent().uuid()) {
        continue;
      }
      this.drawLine(model, model.getAgent().color());
    }
    
    if (this.agentHandler && this.agentHandler.selectedAgent()) {
      var name = this.agentHandler.selectedAgent().name(),
        strWidth = _bufferArea.measureText(name).width,
        boxWidth = strWidth + 10;
      
      var model = this.modelGroup.getRuntimeLineModel(this.agentHandler.selectedAgent().uuid());
      this.drawLine(model, model.getAgent().color());
      
      _bufferArea.restore();
      
      _bufferArea.font = VicsFont.getFont(11, "bold");
      _bufferArea.fillStyle = this.agentHandler.selectedAgent().color().toString();
      _bufferArea.roundRect(this.width - this.rightPadding - boxWidth, this.topPadding - 9 - 14, this.width - this.rightPadding, this.topPadding - 8, 2);
      _bufferArea.fill();
      
      _bufferArea.fillStyle = CanvasChartStyle.line_selected_agent_text_color;
      _bufferArea.textAlign = 'center';
      _bufferArea.textBaseline = "middle";
      _bufferArea.fillText(name, this.width - this.rightPadding - boxWidth / 2, this.topPadding - 15);
    } else {
      _bufferArea.restore();
    }
  },
  
  drawLine: function (model, lineColor) {
    var
      _bufferArea = this.bufferArea,
      _leftPadding = this.leftPadding,     //18
      _topPadding = this.topPadding,       //25
      _rightPadding = this.rightPadding,   //10
      _bottomPadding = this.bottomPadding, //20
      _width = this.width, _height = this.height,
      _min = this.getMin(), _max = this.getMax();
    
    if (!model) {
      return false;
    }
    
    if (model.getMax() === 0) {
      if (this.isZeroLineRender) {
        return false;
      } else {
        this.isZeroLineRender = true;
      }
    }
    _bufferArea.beginPath();
    if (_.isUndefined(model.head)) {
      var
        x1 = _leftPadding,
        x2 = _width - _rightPadding,
        y = _height - _bottomPadding;
      
      _bufferArea.moveTo(x1, y);
      _bufferArea.lineTo(x2, y);
    } else {
      var highValueX = 0, highValueY = 0;
      var rate, x, y;
      var dh_max = _max - _min;
      var real_width = _width - _leftPadding - _rightPadding;
      var real_height = _height - _topPadding - _bottomPadding;
      var unit = model.head;
      var j = 0;
      var l = 0;
      var justInTime = 0;
      var beforeTime = getServerTime() - ClientUtilities.ONE_MINUTE * 5;
      var x1, y1, x2, y2;
      
      while (unit) {
        var currentData = unit;
        rate = (currentData.time - (getServerTime() - ClientUtilities.ONE_MINUTE * 5)) / (ClientUtilities.ONE_MINUTE * 5);
        x = _leftPadding + parseInt((real_width) * rate);
        justInTime = currentData.time;
        
        if (_.isUndefined(currentData.value)) {
          y = _height - _bottomPadding;
        } else if (_min >= currentData.value) {
          y = _height - _bottomPadding;
        } else if (_max <= currentData.value) {
          y = _topPadding;
        } else {
          y = parseInt((_topPadding + (real_height) * (_max - currentData.value) / dh_max )) | 0;
        }
        if (j === 0) {
          if (beforeTime + ClientUtilities.TEN_SECONDS < justInTime) {
            x1 = _leftPadding;
            y1 = _height - _bottomPadding;
            x2 = _leftPadding + parseInt(real_width * ((justInTime - ClientUtilities.TWO_SECONDS) - (getServerTime() - ClientUtilities.ONE_MINUTE * 5)) / (ClientUtilities.ONE_MINUTE * 5));
            y2 = _height - _bottomPadding;
            
            _bufferArea.moveTo(x1, y1);
            _bufferArea.lineTo(x2, y2);
            _bufferArea.lineTo(x, y);
            
          } else {
            _bufferArea.moveTo(x, y);
          }
        } else {
          _bufferArea.lineTo(x, y);
        }
        
        if (this.valueMax == currentData.value && !this.isSetHighValue) {
          this.isSetHighValue = true;
          highValueX = x;
          highValueY = y;
        }
        
        beforeTime = currentData.time;
        unit = unit.next;
        
        j++;
        
      }
      
      if (beforeTime + ClientUtilities.TEN_SECONDS < getServerTime()) {
        x1 = _leftPadding + parseInt(real_width * ((beforeTime + ClientUtilities.TWO_SECONDS) - (getServerTime() - ClientUtilities.ONE_MINUTE * 5)) / (ClientUtilities.ONE_MINUTE * 5)),
          y1 = _height - _bottomPadding;
        _bufferArea.lineTo(x1, y1);
        
        x = _width - _rightPadding;
        y = _height - _bottomPadding;
        _bufferArea.lineTo(x, y);
      }
    }
    
    if (this.agentHandler && this.agentHandler.selectedAgent()) {
      if (this.agentHandler.selectedAgent().uuid == model.getAgent().uuid) {
        _bufferArea.strokeStyle = lineColor.toString();
        _bufferArea.lineWidth = 3;
        _bufferArea.globalCompositeOperation = "source-over";
        _bufferArea.save();
        
        _bufferArea.shadowOffsetX = 2;
        _bufferArea.shadowOffsetY = 2;
        _bufferArea.shadowBlur = 2;
        _bufferArea.shadowColor = CanvasChartStyle.line_shadow_color;
        
        _bufferArea.stroke();
        _bufferArea.restore();
      } else {
        var tempColor = lineColor.copy();
        tempColor.setAlpha(0.3);
        _bufferArea.strokeStyle = tempColor.toString();
        _bufferArea.lineWidth = 1;
        _bufferArea.stroke();
      }
    } else {
      _bufferArea.strokeStyle = lineColor.toString();
      _bufferArea.lineWidth = 2;
      _bufferArea.save();
      
      _bufferArea.shadowOffsetX = 2;
      _bufferArea.shadowOffsetY = 2;
      _bufferArea.shadowBlur = 2;
      _bufferArea.shadowColor = CanvasChartStyle.line_shadow_color;
      
      _bufferArea.stroke();
      _bufferArea.restore();
    }
    
    if (this.isSetHighValue && !this.isRenderHighValue) {
      if (this.agentHandler && this.agentHandler.selectedAgent() && this.agentHandler.selectedAgent().uuid !== model.getAgent().uuid) {
        _bufferArea.globalAlpha = 0.3;
        this.renderPointValue(model.getMax().toLocaleForVics(), highValueX, highValueY, lineColor.toString());
        _bufferArea.globalAlpha = 1;
      } else {
        this.renderPointValue(model.getMax().toLocaleForVics(), highValueX, highValueY, lineColor.toString());
      }
      this.isSetHighValue = false;
      this.isRenderHighValue = true;
    } else {
      if (this.agentHandler && this.agentHandler.selectedAgent() && this.agentHandler.selectedAgent().uuid === model.getAgent().uuid) {
        this.renderPointValue(model.getMax().toLocaleForVics(), highValueX, highValueY, lineColor.toString());
      }
    }
  }
};
vics.chart.util.extend(vics.chart.line.runtime, vics.chart.basic);
vics.chart.donut = function(divDom, model){
  vics.chart.basic.apply(this, [divDom, model, 100]);
  
  this.TOTAL_WIDTH = 121;
  this.LINE_WIDTH = 6;
  this.radius = (this.TOTAL_WIDTH - this.LINE_WIDTH) /2;
  this.label;
  
};
vics.chart.donut.prototype = {
  paintContent:function(){
    var bufferArea = this.bufferArea;
    var modelValue = this.getModel();
    var chartWidth = _.isUndefined(modelValue.optionMap.chartwidth)?this.TOTAL_WIDTH:Number(modelValue.optionMap.chartwidth);
    var lineWidth = _.isUndefined(modelValue.optionMap.linewidth)?this.LINE_WIDTH:Number(modelValue.optionMap.linewidth);
    
    bufferArea.lineWidth = lineWidth;
    var radius = _.isUndefined(modelValue.optionMap.chartwidth)?this.radius:((chartWidth-lineWidth)/2);
    var offset_radians = -0.5 * Math.PI;
    var start_radians = offset_radians;
    var counterClockwise = true;
    var self = this;
    
    bufferArea.beginPath();
    bufferArea.strokeStyle = _.isUndefined(modelValue.lineColor)?CanvasChartStyle.donut_base_color:CanvasChartStyle.donut_color[modelValue.colorIdx];
    var value = modelValue.value || 100;
    var max   = modelValue.maxValue || value;
      
    var end_radians = start_radians - (Math.PI * 2) * value / max;
    bufferArea.arc((chartWidth/2), (chartWidth/2), radius, start_radians, end_radians, counterClockwise);
    bufferArea.stroke();
    start_radians = end_radians;
  
    bufferArea.lineWidth = lineWidth+1;
    bufferArea.beginPath();
    bufferArea.strokeStyle = CanvasChartStyle.donut_base_color;
    end_radians = start_radians - (Math.PI * 2) * (max-value) / max;
    bufferArea.arc((chartWidth/2), (chartWidth/2), radius, start_radians, end_radians, counterClockwise);
    bufferArea.stroke();

    var fontSize = 14;
    bufferArea.font = fontSize + 'pt Montserrat';
    bufferArea.textAlign = 'center';
    bufferArea.fillStyle = _.isUndefined(modelValue.lineColor)?CanvasChartStyle.donut_base_color:CanvasChartStyle.donut_color[modelValue.colorIdx];
    var text = "";
    if(modelValue.value > modelValue.maxValue && modelValue.maxValue === 0){
      text = modelValue.value;
    }else{
      text = modelValue.value+"/"+modelValue.maxValue;
    }
    bufferArea.fillText(text, (chartWidth /2), (chartWidth /2) + fontSize / 2);

    var fontSize = 10;
    bufferArea.font = fontSize + 'pt Montserrat';
    bufferArea.textAlign = 'center';
    bufferArea.fillStyle = _.isUndefined(modelValue.lineColor)?CanvasChartStyle.donut_base_color:CanvasChartStyle.donut_label_text_color;
    bufferArea.fillText(modelValue.label, (chartWidth /2), ((chartWidth /4)*2.8) + fontSize / 4);
  }
};
vics.chart.util.extend(vics.chart.donut, vics.chart.basic);
vics.chart.builder.equalizer = (function (ctx) {
  var _$C = ctx.chart,
    
    build = function (divDom, cmdMap, optionMap) {
      var model = new _$C.model.equalizer(cmdMap, optionMap);
      var chart = new _$C.equalizer(divDom, model);
      
      vics.chart.model.equalizer.shared.addEqModel(model);
      
      chart.setDefaultMax(10);
      
      if (optionMap.fixedmax) {
        chart.setFixedMax(parseInt(optionMap.fixedmax));
      }
      
      if(cmdMap.warningCritical){
        chart.setWarningCritical(parseInt(cmdMap.warningCritical));
      }
      
      if(cmdMap.fatalCritical){
        chart.setFatalCritical(parseInt(cmdMap.fatalCritical));
      }
      
      chart.handlerAgent(vics.chart.eventlistener.selectbydashboard);
      chart.paint();
      
      return chart;
    },
    
    update = function (chart) {
      chart.paint();
    };
  
  return {
    build: build,
    update: update
  };
}(vics));
vics.chart.builder.donut = (function(ctx){
  var
  _$C=ctx.chart,
  build = function(divDom, cmdMap, optionMap){
    var model = new _$C.model.donut(cmdMap, optionMap);
    var chart = new _$C.donut(divDom, model);
  
    vics.chart.model.donut.shared.addDonutModels(model);
    
    chart.paint();
    return chart;
  },
  update = function(chart){
    chart.paint();
  };
  return {
    build:build,
    update:update
  }
}(vics));
vics.chart.builder.line = (function (ctx) {
  var
    _$C = ctx.chart,
    build = function (divDom, cmdMap, optionMap) {
      var model = new _$C.model.modelgroup(cmdMap, optionMap);
      var chart = new _$C.line(divDom, model);
      if (chart.handlerAgent) {
        chart.handlerAgent(vics.chart.eventlistener.selectbydashboard);
      }
      chart.paint();
      
      return chart;
    },
    
    update = function (chart) {
      chart.paint();
    };
  
  return {
    build: build,
    update: update
  };
}(vics));
vics.chart.builder.line.runtime = (function (ctx) {
  var
    _$C = ctx.chart,
    
    build = function (divDom, cmdMap, optionMap) {
      var model = new _$C.model.modelgroup(cmdMap, optionMap);
      var chart = new _$C.line.runtime(divDom, model);
      if (chart.handlerAgent) {
        chart.handlerAgent(vics.chart.eventlistener.selectbydashboard);
      }
      
      chart.setDefaultMax(1);
      
      if (optionMap.fixedmax) {
        chart.setFixedMax(parseInt(optionMap.fixedmax));
      }
      
      chart.paint();
      
      return chart;
    },
    
    update = function (chart) {
      chart.paint();
    };
  
  return {
    build: build,
    update: update
  };
}(vics));

vics.chart.model = function (cmdMap, optionMap) {
  this.cmdMap = cmdMap;
  this.optionMap = optionMap;
  
  if (optionMap) {
    this.datatype = optionMap.datatype;
  }
  
  this.max = 0;
};
vics.chart.model.prototype = {
  getTimeUnit: function () {
    return 60;
  },
  
  getAgent: function () {
    return this.agent;
  },
  
  getAgentByKey: function (key) {
    var agent;
    var _tenantHandler = vics.manager.tenant;
    agent = _tenantHandler.instance(key);
    
    return agent;
  },
  
  getKeys: function () {
    return vics.manager.tenant.instanceKeys();
  },
  
  setAgent: function (agent) {
    this.agent = agent;
  },
  
  getMax: function () {
    return this.max;
  },
  
  setMax: function (max) {
    this.max = max;
  }
};
vics.chart.model.equalizer = function (cmdMap, optionMap) {
  vics.chart.model.apply(this, [cmdMap, optionMap]);
  
  this.equalizerUnits = {};
};
vics.chart.model.equalizer.prototype = {
  clear: function () {
    this.equalizerUnits = {};
  },
  
  getMax: function () {
    var keys = this.getKeys();
    this.max = 0;
    for (var i = 0, len = keys.length; i < len; i++) {
      if (this.equalizerUnits[keys[i]]) {
        var sum = this.equalizerUnits[keys[i]].getValues();
        if (this.max < sum) {
          this.max = sum;
        }
      }
    }
    return this.max;
  },
  
  getValues: function () {
    var units = _.map(this.equalizerUnits);
    for (var i = 0; i < units.length; i++) {
      var sum = units[i].getSum();
      if (this.max < sum) {
        this.max = sum;
      }
    }
    
    return units;
  },
  
  getValue: function (uuid) {
    return this.equalizerUnits[uuid];
  },
  
  getUnit: function (key, values) {
    var equalizerUnit = this.equalizerUnits[key];
    if (!equalizerUnit) {
      equalizerUnit = new vics.chart.model.equalizer.unit(this.getAgentByKey(key), values);
      this.equalizerUnits[key] = equalizerUnit;
    } else {
      equalizerUnit.setValues(values);
    }
  },
  
  sharedCallback: function (data) {
    var cmdMap = this.cmdMap,
      keys = this.getKeys();
    var that = this;
    var sourceData = data.cpuUtilizationEq;
    
    var tenantIds, uuids = cmdMap.uuid, status, isStatus;
    tenantIds = vics.manager.tenant.currentTenantId();
    status = vics.manager.tenant.currentStatus();
    isStatus = vics.manager.tenant.isStatus();
    
    if (!isStatus) {
      if (tenantIds.length !== 1) {
        throw "data empty";
      } else {
        var tenantId = tenantIds[0];
        if (!_.isUndefined(sourceData[tenantId])) {
          uuids = _.keys(sourceData[tenantId]);
          
          for (i = 0; i < uuids.length; i++) {
            var uuid = uuids[i];
            if (uuid !== "0") {
              that.getUnit(uuid, sourceData[tenantId][uuid]);
            }
          }
        }
      }
    } else {
      if (status.length !== 1) {
        throw "data empty";
      } else {
        for (_tenantId in sourceData) {
          for (vmId in sourceData[_tenantId]) {
            var instance = sourceData[_tenantId][vmId];
            if (vmId !== "0") {
              that.getUnit(vmId, instance);
            }
          }
        }
      }
    }
    
    for (var i = 0; i < keys.length; i++) {
      if (!that.getValue(keys[i])) {
        that.getUnit(keys[i], [0, 0, 0, 0]);
      }
    }
  },
  
  callback: function (json) {
    var that = this;
    vics.chart.websocket.process(json[this.cmdMap.key], (function (result, idx) {
      if (!_.isUndefined(result.ErrorCode)) {
      } else {
        for (i in result) {
          var tenantValues = result[i];
          for(_i in tenantValues){
            var values = tenantValues[_i];
            if (values !== 0) {
              that.getUnit(_i, values);
            }
          }
        }
      }
    }));
  }
};
vics.chart.util.extend(vics.chart.model.equalizer, vics.chart.model);
vics.chart.model.equalizer.unit = function (agent, values) {
  this.agent = agent;
  this.values = new Array();
};
vics.chart.model.equalizer.unit.prototype = {
  setMax: function (max) {
    this.max = max;
  },
  
  setValues: function (values) {
    this.values = values;
  },
  
  getValues: function () {
    return this.values;
  },
  
  getAgent: function () {
    return this.agent;
  }
  
};
vics.chart.model.equalizer.shared = (function () {
  var dataValues = {
      "cpuUtilizationEq": {}
    },
    eqModels = [],
    _isDataTrans = false,
    key = "cpuUtilizationEq";
  
  this.isDataTrans = function () {
    return _isDataTrans;
  };
  
  this.addEqModel = function (eqModel) {
    eqModels.push(eqModel);
  };
  
  function setDataValues(type, tenantId, uuid, values) {
    if (_.isUndefined(dataValues[type][tenantId])) {
      dataValues[type][tenantId] = {};
    }
    
    dataValues[type][tenantId][uuid] = values;
  }
  
  function initDataValues(type) {
    var tenantIds = _.keys(dataValues[type]);
    for (var i = 0; i < tenantIds.length; i++) {
      var
        tenantId = tenantIds[i],
        uuids = _.keys(dataValues[type][tenantId]);
      
      for (var j = 0; j < uuids.length; j++) {
        var uuid = uuids[j];
        
        dataValues[type][tenantId][uuid] = 0;
      }
    }
  }
  
  this.initAllData = function () {
    initDataValues(key);
    for (var i = 0; i < eqModels.length; i++) {
      var eqModel = eqModels[i];
      eqModel.sharedCallback(dataValues);
    }
  };
  
  this.exist = function () {
    return (eqModels.length > 0);
  };
  
  this.callback = function (json) {
    
    var
      _tenantHandler = vics.manager.tenant,
      that = this;
    
    vics.chart.websocket.process(json[key], (function (result, idx) {
      
      var tenantIds = _tenantHandler.multiTenantId();
      
      if (!_.isUndefined(result.ErrorCode)) {
        that.initAllData();
      } else {
        var data = result;
        
        for (var i = 0, max = tenantIds.length; i < max; i++) {
          var tenantId = tenantIds[i];
          var uuids = _.keys(data[tenantId]);
          
          for (var j = 0, uuidLength = uuids.length; j < uuidLength; j++) {
            var uuid = uuids[j];
            setDataValues(key, tenantId, uuid, data[tenantId][uuid]);
          }
        }
        
        for (var i = 0; i < eqModels.length; i++) {
          var eqModel = eqModels[i];
          eqModel.sharedCallback(dataValues);
        }
      }
    }));
    
  };
  
  return {
    isDataTrans: isDataTrans,
    initAllData: initAllData,
    addEqModel: addEqModel,
    callback: callback,
    exist: exist
  };
  
}());
vics.chart.model.modelgroup = function (cmdMap, optionMap) {
  vics.chart.model.apply(this, [cmdMap, optionMap]);
  this.models = {};
  this.modelsByColor = {};
};
vics.chart.model.modelgroup.prototype = {
  clear: function () {
    if (!_.isUndefined(this.cmdMap) && !_.isUndefined(this.cmdMap.requestInfo)) {
      delete this.cmdMap["requestInfo"];
    }
    
    for (var prop in this.models) {
      delete this.models[prop];
    }
    
    for (var prop in this.modelsByColor) {
      delete this.modelsByColor[prop];
    }
  },
  
  remove: function (key) {
    delete this.models[key];
  },
  
  getModels: function () {
    
    return _.map(this.models);
  },
  
  getRuntimeLineModel: function (key) {
    var model = this.models[key];
    if (_.isUndefined(model)) {
      var agent = this.getAgentByKey(key);
      if (agent) {
        model = new vics.chart.model.runtimeline(this.cmdMap, this.optionMap);
        model.setAgent(agent);
        this.models[key] = model;
      }
    }
    
    return model;
  },
  
  getMax: function () {
    var max = 0, model;
    
    var keys = this.getKeys();
    for (var i = 0, len = keys.length; i < len; i++) {
      model = this.models[keys[i]];
      if (model && max < model.getMax()) {
        max = model.getMax();
      }
      
      if (!_.isUndefined(this.modelsForMax)) {
        model = this.modelsForMax[keys[i]];
        if (model && max < model.getMax()) {
          max = model.getMax();
        }
      }
    }
    
    return max;
  },
  
  callback: function (json) {
    var
      cmdMap = this.cmdMap,
      key = cmdMap.key,
      _tenantHandler = vics.manager.tenant,
      that = this,
      isStatus = _tenantHandler.isStatus(),
      status = _tenantHandler.selectStatus();
    
    vics.chart.websocket.process(json[key], (function (data) {
      var tenantIds = [];
      
      if (!_.isUndefined(data.ErrorCode)) {
      } else {
        tenantIds = _.keys(data);
        if (!isStatus) {
          for (var i = 0; i < tenantIds.length; i++) {
            var tenantId = tenantIds[i];
            var valueByUuids = data[tenantId];
            var uuids = _.keys(valueByUuids);
            for (var j = 0, max = uuids.length; j < max; j++) {
              var uuid = uuids[j], model;
              
              if (that.cmdMap.tenantId[0] === tenantId) {
                var object = valueByUuids[uuid];
                if (!_.isUndefined(uuid)) {
                  model = that.getRuntimeLineModel(uuid);
                  if (model) {
                    model.add(object);
                    model.rangeValid();
                  }
                }
              }
            }
          }
        } else {
          for (var i = 0; i < tenantIds.length; i++) {
            var tenantId = tenantIds[i];
            var valueByUuids = data[tenantId];
            var uuids = _.keys(valueByUuids);
            
            for (var j = 0, max = uuids.length; j < max; j++) {
              var uuid = uuids[j], model;
              var list = valueByUuids[uuid];
              if (!_.isUndefined(uuid)) {
                model = that.getRuntimeLineModel(uuid);
                if (model) {
                  model.add(list);
                  model.rangeValid();
                }
              }
            }
          }
        }
      }
      
      tenantIds = _tenantHandler.currentTenantId();
      
    }));
  }
};
vics.chart.util.extend(vics.chart.model.modelgroup, vics.chart.model);
vics.chart.model.runtimeline = function (cmdMap) {
  vics.chart.model.apply(this, [cmdMap, undefined]);
  this.head;
  this.tail;
  this.current = 0;
  this.max = 0;
  this.length = 0;
};
vics.chart.model.runtimeline.prototype = {
  clear: function () {
    this.current = 0;
    this.max = 0;
  },
  
  add: function (data) {
    if (this.tail) {
      if (this.tail.time > data.time) {
        return false;
      }
    }
    
    this.length++;
    
    if (_.isUndefined(this.head)) {
      this.head = data;
      this.tail = data;
    } else {
      this.tail.next = data;
      this.tail = data;
    }
    
    
    var max = 0;
    var unit = this.head;
    while (!_.isUndefined(unit)) {
      if (max < unit.value) {
        max = unit.value;
      }
      unit = unit.next;
    }
    
    this.max = max;
    
    if (this.max < data.value) {
      this.max = data.value;
    }
    this.current = data.value;
    
  },
  
  rangeValid: function () {
    while (!_.isUndefined(this.head) && this.head.time < (getServerTime() - ClientUtilities.ONE_MINUTE * 5)) {
      this.length--;
      this.head = this.head.next;
    }
  }
};
vics.chart.util.extend(vics.chart.model.runtimeline, vics.chart.model);
vics.chart.model.donut = function (cmdMap, optionMap) {
  vics.chart.model.apply(this, [cmdMap, optionMap]);
  this.label = "";
  this.labelColor;
  this.value = 0;
  this.lineColor;
  this.maxValue = 0;
  this.donutChart = {};
  this.colorIdx = 0;
};
vics.chart.model.donut.prototype = {
  setLabel:function(label){
    this.label = label;
  },
  
  getLabel:function(){
    return this.label;
  },
  
  setLabelColor:function(labelColor){
    this.labelColor = labelColor;
  },
  
  getLabelColor:function(){
    return this.labelColor;
  },
  
  setValue:function(value){
    this.value = value;
  },
  
  getValue:function(){
    return this.value;
  },
  
  setLineColor:function(lineColor){
    this.lineColor = lineColor;
  },
  
  getLineColor:function(){
    return this.lineColor;
  },
  
  setMaxValue:function(maxValue){
    this.maxValue = maxValue;
  },
  
  getMaxValue:function(){
    return this.maxValue;
  },
  
  init:function(key, initObj, colorIdx){
    this.colorIdx = colorIdx;
    if(!_.isUndefined(initObj.label)){
      this.label = initObj.label;
    }
  
    if(!_.isUndefined(initObj.labelColor)){
      this.labelColor =initObj.labelColor;
    }
  
    if(!_.isUndefined(initObj.value)){
      this.value = initObj.value;
    }
  
    if(!_.isUndefined(initObj.lineColor)){
      this.lineColor = initObj.lineColor;
    }
  
    if(!_.isUndefined(initObj.maxValue)){
      this.maxValue = initObj.maxValue;
    }
  }
};
vics.chart.util.extend(vics.chart.model.donut, vics.chart.model);
vics.chart.model.donut.shared = (function(){
  var donutModels = [],
  addDonutModels = function(model){
    donutModels.push(model);
  },
  getDonutModels = function(){
    return donutModels;
  },
  init = function(initObj){
    if(initObj.length > 0) {
      for (idx = 0, max = donutModels.length; idx < max; idx++) {
        var chartModel = donutModels[idx];
        var chartName = chartModel.cmdMap.chartName;
        for (_idx = 0, _max = initObj.length; _idx < _max; _idx++) {
          var donutObject = initObj[_idx][chartName];
          if(!_.isUndefined(donutObject)){
            donutModels[idx].init(chartName, donutObject, idx);
          }
        }
    
      }
    }
  };
  
  return {
    init:init,
    addDonutModels: addDonutModels,
    getDonutModels: getDonutModels
  };
}());

vics.chart.eventlistener = {};
vics.chart.eventlistener = function (chart, impl, handleKeydown) {
  this.chart = chart;
  if (impl) {
    this.impl = impl;
    this.listen();
  } else {
    this.listenInChart();
  }
  this.mousePos = null;
  this.mouseDown = false;
  this.mouseUp = false;
  this.dblclick = false;
};
vics.chart.eventlistener.prototype = {
  listen: function () {
    var that = this;
    this.chart.listenerArea.canvas.addEventListener("mousedown", function (evt) {
      if (evt.button == 0) {
        that.isLeftMouse = true;
      } else if (evt.button == 2) {
        that.isLeftMouse = false;
      }
      that.mouseDown = true;
      that.keyDown = false;		// function key(Ctrl, Atl...) 함께 눌렀을 때 keyDown 을 false 강제로 지정
      that.handleEvent(evt);
    }, false);
    this.chart.listenerArea.canvas.addEventListener("dblclick", function (evt) {
      that.dblclick = true;
      that.handleEvent(evt);
      that.dblclick = false;
    }, false);
    this.chart.listenerArea.canvas.addEventListener("mousemove", function (evt) {
      that.mouseUp = false;
      that.mouseDown = false;
      that.handleEvent(evt);
    }, false);
    window.addEventListener("mouseup", function (evt) {
      that.mouseUp = true;
      that.mouseDown = false;
      that.handleEvent(evt);
      
      that.clickStart = false;
    }, false);
    
    this.chart.listenerArea.canvas.addEventListener("mouseout", function (evt) {
      that.mousePos = null;
      that.impl.outMouse();
    }, false);
  },
  
  listenInChart: function () {
    var that = this;
    this.chart.listenerArea.canvas.addEventListener("mousemove", function (evt) {
      that.handleEvent(evt);
    }, false);
    
    this.chart.listenerArea.canvas.addEventListener("mousedown", function (evt) {
      that.mouseDown = true;
      that.handleEvent(evt);
    }, false);
    
    window.addEventListener("mouseup", function (evt) {
      that.mouseUp = true;
      that.mouseDown = false;
      that.handleEvent(evt);
      
      that.clickStart = false;
    }, false);
    
    this.chart.listenerArea.canvas.addEventListener("dblclick", function (evt) {
      that.dblclick = true;
      that.handleEvent(evt);
    }, false);
    
    this.chart.listenerArea.canvas.addEventListener("mouseout", function (evt) {
      that.handleEvent(evt);
      that.mousePos = null;
    }, false);
    
    if (checkTablet()) {
      $(this.chart.listenerArea.canvas).hammer({
        preventMouse: true,
        preventDefault: true
      }).on("tap", function (evt) {
        that.tap = true;
        that.handleEvent(evt.gesture);
      }).on("doubletap", function (evt) {
        that.doubletap = true;
        that.dblclick = true;
        that.handleEvent(evt.gesture);
        that.doubletap = false;
        that.dblclick = false;
      }).on('dragstart', function (evt) {
        that.mouseDown = true;
        that.touchStart = true;
        that.handleEvent(evt.gesture);
      }).on('drag', function (evt) {
        evt.gesture.preventDefault();
        that.mouseUp = false;
        that.mouseDown = false;
        that.handleEvent(evt.gesture);
      }).on('dragend', function (evt) {
        that.touchStart = false;
        that.touchEnd = true;
        that.mouseDown = false;
        that.handleEvent(evt.gesture);
      });
    }
    
  },
  
  handleEvent: function (evt) {
    if (!evt) {
      evt = window.event;
    }
    
    if (evt.type !== "keydown" && evt.type !== "keypress" && evt.type !== "keyup") {
      this.setMousePosition(evt);
      this.setTouchPosition(evt);
    }
    if (this.impl) {
      this.impl.detectEvent(evt);
    }
  },
  
  setMousePosition: function (evt) {
    var containerPosition = this.getContainerPosition(),
      scrollPosition = this.getScrollPosition();
    
    var mouseX = evt.clientX - containerPosition.left + scrollPosition.left;
    var mouseY = evt.clientY - containerPosition.top + scrollPosition.top;
    this.mousePos = {
      x: mouseX,
      y: mouseY
    };
  },
  
  setTouchPosition: function (evt) {
    
    if (evt.touches !== undefined && evt.touches.length == 1) {
      var containerPosition = this.getContainerPosition(),
        scrollPosition = this.getScrollPosition();
      
      var touch = evt.touches[0];
      var touchX = touch.clientX - containerPosition.left + scrollPosition.left;
      var touchY = touch.clientY - containerPosition.top + scrollPosition.top;
      
      this.mousePos = this.touchPos = {
        x: touchX,
        y: touchY
      };
    }
  },
  
  getContainerPosition: function () {
    var obj = this.chart.listenerArea.canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != "BODY") {
      top += obj.offsetTop;
      left += obj.offsetLeft;
      obj = obj.offsetParent;
    }
    return {
      top: top,
      left: left
    };
  },
  
  getScrollPosition: function () {
    var top = 0, left = 0,
      obj = this.chart.listenerArea.canvas;
    
    left += window.pageXOffset;
    top += window.pageYOffset;
    
    while (obj && obj.tagName != "BODY") {
      left += obj.scrollLeft;
      top += obj.scrollTop;
      obj = obj.parentNode;
    }
    
    return {
      top: top,
      left: left
    };
  }
  
};
vics.chart.eventlistener.selectbydashboard = (function () {
  var _selectedAgent,
    _selectCallbackFunc,
    _unSelectCallbackFunc,
    selectCallbackFunc = function (func) {
      _selectCallbackFunc = func;
    },
    unSelectCallbackFunc = function (func) {
      _unSelectCallbackFunc = func;
    },
    selectedAgent = function (selectedAgent) {
      if (selectedAgent) {
        if (!_.isUndefined(_selectCallbackFunc)) {
          _selectCallbackFunc();
        }
        
        if (_selectedAgent == selectedAgent) {
          _selectedAgent = null;
          
          if (!_.isUndefined(_unSelectCallbackFunc)) {
            _unSelectCallbackFunc();
          }
        } else {
          _selectedAgent = selectedAgent;
        }
      }
      
      return _selectedAgent;
    },
    unSelect = function () {
      _selectedAgent = null;
      
      if (!_.isUndefined(_unSelectCallbackFunc)) {
        _unSelectCallbackFunc();
      }
    };
  
  return {
    selectedAgent: selectedAgent,
    unSelect: unSelect,
    selectCallbackFunc: selectCallbackFunc,
    unSelectCallbackFunc: unSelectCallbackFunc
  };
}());
vics.chart.eventlistener.equalizer = function (chart) {
  this.chart = chart;
  
  this.eventListener = new vics.chart.eventlistener(chart, this);
};
vics.chart.eventlistener.equalizer.prototype = {
  outMouse: function () {
  },
  detectEvent: function () {
    this.paint();
  },
  renderName: function (name, x) {
    var _chart = this.chart,
      _listenerArea = _chart.listenerArea,
      y = _chart.height - _chart.bottomPadding - 4;
    
    _listenerArea.beginPath();
    
    _listenerArea.font = VicsFont.getFont(11, "bold");
    var strWidth = _listenerArea.measureText(name).width;
    var boxWidth = strWidth + 10;
    
    _listenerArea.fillStyle = CanvasChartStyle.render_box_value_box_color;
    _listenerArea.roundRect(x - boxWidth / 2, y + 8, x + boxWidth / 2, y + 9 + 14, 2);
    _listenerArea.fill();
    
    _listenerArea.beginPath();
    _listenerArea.moveTo(x, y + 3);
    _listenerArea.lineTo(x + 3, y + 8);
    _listenerArea.lineTo(x - 3, y + 8);
    _listenerArea.closePath();
    _listenerArea.fill();
    
    _listenerArea.fillStyle = CanvasChartStyle.render_box_value_text_color;
    _listenerArea.textAlign = 'center';
    _listenerArea.textBaseline = "middle";
    _listenerArea.fillText(name, x, y + 15);
    
  },
  paint: function () {
    var that = this.eventListener;
    var
      _chart = this.chart,
      _model = _chart.getModel(),
      cmdMap = _model.cmdMap,
      _tenantHandler = vics.manager.tenant,
      _listenerArea = _chart.listenerArea;
    
    var width = _chart.width - _chart.leftPadding - _chart.rightPadding;
    var height = _chart.height - _chart.topPadding - _chart.bottomPadding;
    
    _listenerArea.clearRect(0, 0, _listenerArea.canvas.width, _listenerArea.canvas.height);
    
    var keys = _chart.getModel().getKeys();
    var countOfModel = keys.length;
    var modelWidth;
    if (countOfModel == 1) {
      modelWidth = parseInt(width / 2) - this.chart.SPACE_WIDTH;
    } else {
      modelWidth = parseInt(width / countOfModel) - this.chart.SPACE_WIDTH;
    }
    
    var tenantIds;
    tenantIds = _tenantHandler.currentTenantId();
    
    _chart.listenerArea.canvas.style.cursor = 'default';
    for (var i = 0; i < countOfModel; i++) {
      var x = _chart.leftPadding + parseInt(i * width / countOfModel + width / countOfModel / 2);
      var eqUnit = _model.getValue(keys[i]);
      var agent = _model.getAgentByKey(keys[i]);
      
      _chart.listenerArea.beginPath();
      _chart.listenerArea.rect(x - modelWidth / 2, this.chart.topPadding, modelWidth, height);
      _chart.listenerArea.canvas.style.cursor = 'pointer';
      
      if (DevicePixelRatioUtil.isCanvasPointPath(_chart.listenerArea, that.mousePos)) {
        this.renderName(agent.name(), x);
        if (that.mouseDown) {
          this.chart.agentHandler.selectedAgent(agent);
          that.mouseDown = false;
        }
      }
    }
    
    if (that.mouseDown) {
      that.mouseDown = false;
      this.chart.agentHandler.unSelect();
    }
  }
};
vics.chart.eventlistener.xyaxis = function (chart, eventListener) {
  this.chart = chart;
  this.eventListener = eventListener;
  
};
vics.chart.eventlistener.xyaxis.prototype = {
  paint: function (ratio) {
    var _eventListener = this.eventListener,
      _mousePos = _eventListener.mousePos,
      _chart = this.chart,
      _listenerArea = _chart.listenerArea,
      _currentYValue, _boxWidth,
      _stime, _range, _formatStr,
      _moment,
      _currentXTime, _hour, _min;
    
    if (_.isUndefined(_mousePos) || _mousePos === null || _mousePos.x < _chart.leftPadding || _mousePos.x > _chart.width - _chart.rightPadding ||
      _mousePos.y < _chart.topPadding - _chart.leftRenderer.TOP_PADDING || _mousePos.y > _chart.height - _chart.bottomPadding) {
      return;
    }
    
    _listenerArea.beginPath();
    _listenerArea.moveTo(_chart.leftPadding - 0.5, _mousePos.y - 0.5);
    _listenerArea.lineTo(_chart.width - _chart.rightPadding - 0.5, _mousePos.y - 0.5);
    _listenerArea.moveTo(_mousePos.x - 0.5, _chart.topPadding - 0.5 - _chart.leftRenderer.TOP_PADDING);
    _listenerArea.lineTo(_mousePos.x - 0.5, _chart.height - _chart.bottomPadding - 0.5);
    _listenerArea.lineWidth = 1;
    _listenerArea.strokeStyle = CanvasChartStyle.xy_axis_stroke_color;
    _listenerArea.stroke();
    
    _currentYValue = _chart.getMax() * ( ((_chart.height - _chart.bottomPadding - _chart.topPadding) - (_mousePos.y - _chart.topPadding)) / (_chart.height - _chart.bottomPadding - _chart.topPadding));
    if (ratio) {
      _currentYValue = _currentYValue / ratio;
    }
    
    _currentYValue = ((_currentYValue) | 0).toLocaleForVics();
    
    
    if (_chart instanceof vics.chart.line.runtime) {
      _range = _chart.getRange();
      _stime = getServerTime();
      _moment = getServerMoment(_stime - _range);
      _formatStr = "HH:mm:ss";
      
    } else {
      _range = ClientUtilities.ONE_DAY;
      
      _moment = getServerMoment();
      _moment.set('hour', 0);
      _moment.set('minute', 0);
      _moment.set('second', 0);
      _moment.set('millisecond', 0);
      
      _formatStr = "HH:mm";
    }
    
    var scale = _range * (_mousePos.x - _chart.leftPadding ) / (_chart.width - _chart.leftPadding - _chart.rightPadding);
    
    _moment.add(scale, 'milliseconds');
    
    _currentXTime = _moment.format(_formatStr);
    
    _listenerArea.fillStyle = CanvasChartStyle.render_box_value_box_color;
    
    _listenerArea.font = VicsFont.getFont(11, "bold");
    _boxWidth = _listenerArea.measureText(_currentYValue).width + 10;
    
    _listenerArea.roundRect(_chart.leftPadding + 0.5 - 3 - _boxWidth, _mousePos.y - 0.5 - 8, _chart.leftPadding + 0.5 - 3, _mousePos.y - 0.5 + 8, 2);
    _listenerArea.fill();
    
    _listenerArea.beginPath();
    _listenerArea.moveTo(_chart.leftPadding + 0.5, _mousePos.y - 0.5);
    _listenerArea.lineTo(_chart.leftPadding + 0.5 - 5, _mousePos.y - 0.5 - 3);
    _listenerArea.lineTo(_chart.leftPadding + 0.5 - 5, _mousePos.y - 0.5 + 3);
    _listenerArea.closePath();
    _listenerArea.fill();
    
    _listenerArea.fillStyle = CanvasChartStyle.render_box_value_text_color;
    _listenerArea.textAlign = 'center';
    _listenerArea.textBaseline = "middle";
    _listenerArea.fillText(_currentYValue, _chart.leftPadding - 3 - _boxWidth / 2, _mousePos.y);
    
    var strWidth = _listenerArea.measureText(_currentXTime).width;
    var boxWidth = strWidth + 10;
    
    _listenerArea.roundRect(_mousePos.x - 0.5 - boxWidth * 0.5, _chart.height - _chart.bottomPadding + 3, _mousePos.x - 0.5 + boxWidth * 0.5, _chart.height - _chart.bottomPadding + 19, 2);
    _listenerArea.fillStyle = CanvasChartStyle.render_box_value_box_color;
    _listenerArea.fill();
    
    _listenerArea.beginPath();
    _listenerArea.moveTo(_mousePos.x, _chart.height - _chart.bottomPadding - 1);
    _listenerArea.lineTo(_mousePos.x - 3, _chart.height - _chart.bottomPadding + 3);
    _listenerArea.lineTo(_mousePos.x + 3, _chart.height - _chart.bottomPadding + 3);
    _listenerArea.closePath();
    _listenerArea.fill();
    
    _listenerArea.fillStyle = CanvasChartStyle.render_box_value_text_color;
    
    _listenerArea.textAlign = 'center';
    _listenerArea.textBaseline = "middle";
    _listenerArea.fillText(_currentXTime, _mousePos.x, _chart.height - _chart.bottomPadding + 11);
    
  }
};
vics.chart.eventlistener.line = function (chart) {
  this.chart = chart;
  //this.selectedAgent;
  this.eventListener = new vics.chart.eventlistener(chart, this);
  this.xyaxis = new vics.chart.eventlistener.xyaxis(chart, this.eventListener);
};
vics.chart.eventlistener.line.runtime = function (chart) {
  this.chart = chart;
  
  this.isViewSlide = false;
  //this.selectedAgent;
  this.eventListener = new vics.chart.eventlistener(chart, this);
  
  this.xyaxis = new vics.chart.eventlistener.xyaxis(chart, this.eventListener);
  
};
vics.chart.eventlistener.line.runtime.prototype = {
  outMouse: function () {
    this.isViewSlide = false;
    this.isViewRightMenu = false;
    
    this.chart.paintChart();
  },
  
  detectEvent: function () {
    var that = this.eventListener;
    if (that.mouseDown) {
      if (this.isViewSlide) {
        this.slideMinMax.detectEvent("mousedown");
        this.slideRange.detectEvent("mousedown");
      }
      
      var imageData = DevicePixelRatioUtil.getMousePosImageData(this.chart.chartArea, that.mousePos);
      var color = new Color(imageData[0], imageData[1], imageData[2]);
      
      var models = this.chart.modelGroup.getModels();
      var isSelect = false;
      for (var i = 0; i < models.length; i++) {
        if (!_.isUndefined(models[i].getAgent()) && models[i].getAgent().color().getRGB() === color.getRGB()) {
          isSelect = true;
          if (this.chart.agentHandler) {
            this.chart.agentHandler.selectedAgent(models[i].getAgent());
          }
          break;
        }
      }
      
      if (!isSelect) {
        if (this.chart.agentHandler) {
          this.chart.agentHandler.unSelect();
        }
      }
      
    }
    else if (that.mouseUp) {
      that.mouseUp = false;
      
      if (this.isViewSlide) {
        this.slideMinMax.detectEvent("mouseup");
        this.slideRange.detectEvent("mouseup");
      }
    }
    
    else {
      this.chart.listenerArea.canvas.style.cursor = 'default';
      
      if (this.isViewSlide) {
        this.slideMinMax.detectEvent("mousemove");
        this.slideRange.detectEvent("mousemove");
      }
      
      this.paint();
    }
  },
  
  paint: function () {
    this.chart.listenerArea.clearRect(0, 0, this.chart.width, this.chart.height);
    
    var that = this.eventListener;
    var imageData = DevicePixelRatioUtil.getMousePosImageData(this.chart.chartArea, that.mousePos);
    var color = new Color(imageData[0], imageData[1], imageData[2]);
    
    var models = this.chart.modelGroup.getModels();
    for (var i = 0; i < models.length; i++) {
      if (!_.isUndefined(models[i].getAgent()) && models[i].getAgent().color().getRGB() === color.getRGB()) {
        this.chart.listenerArea.canvas.style.cursor = 'pointer';
        renderSelectPointText(this.chart.listenerArea, models[i].getAgent().name(), that.mousePos.x, that.mousePos.y, color.toString());
        break;
      }
    }
    this.xyaxis.paint();
    
    if (this.isViewSlide) {
      this.slideMinMax.paint();
      this.slideRange.paint();
    }
  }
};

vics.chart.bottomrenderer = function (chart) {
  this.SCROLL_HEIGHT = 14;
  this.BOTTOM_HEIGHT = 20;
  
  this.height = this.BOTTOM_HEIGHT;
  this.chart = chart;
};
vics.chart.bottomrenderer.prototype = {
  getHeight: function () {
    return this.BOTTOM_HEIGHT;
  }
};
vics.chart.bottomrenderer.agents = function (chart) {
  vics.chart.bottomrenderer.apply(this, [chart]);
};
vics.chart.bottomrenderer.agents.prototype = {
  paint: function () {
    var
      _chart = this.chart,
      _model = _chart.getModel(),
      xAxisContext = _chart.bufferArea;
    xAxisContext.lineWidth = 2;
    xAxisContext.strokeStyle = CanvasChartStyle.axis_color;
    xAxisContext.beginPath();
    
    xAxisContext.moveTo(_chart.leftPadding, _chart.height - this.getHeight());
    xAxisContext.lineTo(_chart.width - _chart.rightPadding, _chart.height - this.getHeight());
    
    xAxisContext.stroke();
    xAxisContext.closePath();
    
    var leftPadding = _chart.leftPadding;
    var rightPadding = _chart.rightPadding;
    var width = _chart.width - leftPadding - rightPadding;
    
    var keys = _model.getKeys();
    
    xAxisContext.lineWidth = 1;
    var x, nameLength;
    for (var i = 0; i < keys.length; i++) {
      
      xAxisContext.textBaseline = 'bottom';
      xAxisContext.textAlign = 'left';
      xAxisContext.fillStyle = CanvasChartStyle.axis_text_color;
      xAxisContext.font = VicsFont.getFont(11);
      
      var name;
      var agent = _model.getAgentByKey(keys[i]);
      if (agent) {
        name = agent.name();
      }
      
      nameLength = xAxisContext.measureText(name).width;
      x = leftPadding + (i * width / keys.length + width / keys.length / 2) - nameLength * 0.5;
      
      xAxisContext.fillText(name, x, this.chart.height - 1);
      xAxisContext.font = VicsFont.getFont(9, 'bold');
    }
  }
};
vics.chart.util.extend(vics.chart.bottomrenderer.agents, vics.chart.bottomrenderer);
vics.chart.bottomrenderer.runtime = function (chart) {
  vics.chart.bottomrenderer.apply(this, [chart]);
};
vics.chart.util.extend(vics.chart.bottomrenderer.runtime, vics.chart.bottomrenderer);
vics.chart.bottomrenderer.runtime.prototype = {
  getHeight: function () {
    if (this.chart.mouseListener && (this.chart.mouseListener.isViewSlide || this.chart.isRealTimeView)) {
      this.height = this.BOTTOM_HEIGHT + this.SCROLL_HEIGHT;
    } else {
      this.height = this.BOTTOM_HEIGHT;
    }
    
    return this.height;
  },
  paint: function () {
    var _chart = this.chart,
      _bufferArea = _chart.bufferArea;
    
    _bufferArea.beginPath();
    _bufferArea.moveTo(_chart.leftPadding, _chart.height - this.getHeight());
    _bufferArea.lineTo(_chart.width - _chart.rightPadding, _chart.height - this.getHeight());
    
    _bufferArea.lineCap = 'butt';
    _bufferArea.strokeStyle = CanvasChartStyle.axis_color;
    _bufferArea.lineWidth = 2;
    _bufferArea.stroke();
    _bufferArea.closePath();
    
    var range = _chart.getRange();
    var currentTime = getServerTime();
    var runtimeMoment = getServerMoment(currentTime - range);
    runtimeMoment.set('second', 0);
    runtimeMoment.set('millisecond', 0);
    
    var count = _chart.width / 80;
    if (count < 1) {
      count = 1;
    }
    
    var scale = ClientUtilities.getTimeUnit((range / count) | 0);
    var time, x;
    var leftPadding = _chart.leftPadding;
    var rightPadding = _chart.rightPadding;
    var topPadding = _chart.topPadding;
    var bottomPadding = _chart.bottomPadding;
    
    _bufferArea.save();
    _bufferArea.beginPath();
    _bufferArea.rect(leftPadding, _chart.height - bottomPadding - 5, _chart.width - leftPadding - rightPadding, bottomPadding + 5);
    _bufferArea.clip();
    
    _bufferArea.textAlign = 'center';
    _bufferArea.textBaseline = "bottom";
    _bufferArea.font = VicsFont.getFont(11);
    
    
    for (; runtimeMoment.valueOf() < currentTime; runtimeMoment.add(scale, 'milliseconds')) {
      time = range >= ClientUtilities.ONE_MINUTE * 5 ? runtimeMoment.format('HH:mm') : runtimeMoment.format('HH:mm:ss');
      x = ((this.chart.width - leftPadding - rightPadding) * (runtimeMoment.valueOf() - currentTime + range) / range + leftPadding) | 0;
      if (x >= leftPadding) {
        
        _bufferArea.fillStyle = CanvasChartStyle.axis_text_color;
        
        _bufferArea.fillText(time, x, _chart.height - this.getHeight() + 16);
        
        _bufferArea.beginPath();
        _bufferArea.fillStyle = CanvasChartStyle.bottom_axis_circle_color;
        _bufferArea.strokeStyle = CanvasChartStyle.bottom_axis_circle_stroke;
        _bufferArea.arc(x, _chart.height - this.getHeight(), 4, 0, ClientUtilities.PI2, false);
        _bufferArea.closePath();
        _bufferArea.stroke();
        _bufferArea.fill();
      }
    }
    _bufferArea.restore();
  }
};

vics.chart.leftrenderer = function (chart) {
  this.chart = chart;
  this.width = 46;
  
  this.format;
  this.isFillArea = false;
  
  this.SCROLL_WIDTH = 16;
  this.LEFT_PADDING = 12;
  this.RIGHT_PADDING = 2;
  this.TOP_PADDING = 16;
  this.pattern = [2, 2];
  
};
vics.chart.leftrenderer.prototype = {
  setFillArea: function (fillArea) {
    this.isFillArea = fillArea;
  },
  
  getWidth: function (maxValue) {
    
    this.chart.bufferArea.font = VicsFont.getFont(11);
    var width = this.chart.bufferArea.measureText(this.getMaxValueString()).width + this.LEFT_PADDING + this.RIGHT_PADDING;
    if (this.chart.mouseListener && (this.chart.mouseListener.isViewSlide || this.chart.isRealTimeView || this.chart.isAnalysisView)) {
      width += this.SCROLL_WIDTH;
    }
    
    this.width = width;
    
    return parseInt(this.width);
  },
  
  getValue: function (yPosition) {
    var topPadding = this.chart.topPadding;
    var bottomPadding = this.chart.getBottomPadding();
    
    var value = (1 - (yPosition - topPadding) / (this.chart.height - topPadding - bottomPadding)) * (this.chart.getMax() - this.chart.getMin()) + this.chart.getMin();
    
    return value;
  },
  
  getMaxValueString: function () {
    var max = this.chart.getMax();
    var min = this.chart.getMin();
    
    if (max == 0) {
      return false;
    }
    
    var tempMax = max * 100;
    var tempMin = min * 100;
    
    var topPadding = this.chart.topPadding;
    var bottomPadding = this.chart.getBottomPadding();
    var height = this.chart.height - topPadding - bottomPadding;
    var yLableUnit = ClientUtilities.getSplitUnit((tempMax - tempMin), height);
    var baseUnit = this.chart.getBaseUnitValue();
    
    var maxValue = "";
    for (var i = tempMax; i >= tempMin; i -= yLableUnit) {
      var value = i * 0.01;
      
      var unitString = value.toUnitString(baseUnit);
      if (maxValue.length < unitString.length) {
        maxValue = unitString;
      }
    }
    return maxValue;
  },
  
  paint: function () {
    var topPadding = this.chart.topPadding;
    var bottomPadding = this.chart.getBottomPadding();
    var height = this.chart.height - topPadding - bottomPadding;
    var _bufferArea = this.chart.bufferArea;
    
    _bufferArea.strokeStyle = CanvasChartStyle.axis_color;
    _bufferArea.lineWidth = 2;
    
    _bufferArea.beginPath();
    _bufferArea.moveTo(this.width, topPadding - this.TOP_PADDING);
    _bufferArea.lineTo(this.width, this.chart.height - this.chart.bottomPadding);
    _bufferArea.stroke();
    _bufferArea.closePath();
    
    var max = this.chart.getMax();
    var min = this.chart.getMin();
    
    var isFill = false;
    var previousValue;
    var previousY;
    
    if (max == 0) return;
    
    var tempMax = max * 100;
    var tempMin = min * 100;
    
    var yLableUnit = ClientUtilities.getSplitUnit((tempMax - tempMin), height);
    
    var baseUnit = this.chart.getBaseUnitValue();
    
    _bufferArea.save();
    _bufferArea.setLineDash(this.pattern);
    for (var i = tempMax; i >= tempMin; i -= yLableUnit) {
      
      var y = ((height * (tempMax - i) / (tempMax - tempMin)) + topPadding) | 0;
      var value = i * 0.01;
      if (value != previousValue && i !== 0) {
        _bufferArea.textBaseline = "middle";
        _bufferArea.textAlign = "right";
        _bufferArea.fillStyle = CanvasChartStyle.axis_text_color;
        _bufferArea.font = VicsFont.getFont(11);
        
        var renderText = this.isXView ? value.toLocaleForVics() : value.toUnitString(baseUnit);
        _bufferArea.fillText(renderText, this.width - this.RIGHT_PADDING, y);
        _bufferArea.lineWidth = 1;
        _bufferArea.strokeStyle = CanvasChartStyle.dashedline_color;
        _bufferArea.beginPath();
        
        _bufferArea.moveTo(this.width + 1, y);
        _bufferArea.lineTo(this.chart.width - this.chart.rightPadding, y);
        
        _bufferArea.stroke();
        _bufferArea.closePath();
        
        if (this.isFillArea) {
          if (isFill == true) {
            _bufferArea.fillStyle = CanvasChartStyle.dashedfill_color;
            _bufferArea.fillRect(this.width + 1, y, this.chart.width - this.width - this.chart.rightPadding, previousY - y);
          }
          isFill = !isFill;
        }
        
        previousY = y;
      }
    }
    
    _bufferArea.restore();
  }
};
vics.chart.legendrenderer = function (chart, layout) {
  this.chart = chart;
  
  if (layout) {
    this.layout = layout;
  } else {
    this.layout = 1;
  }
};
vics.chart.legendrenderer.prototype = {
  getHeight: function () {
    return 31;
  },
  
  paint: function () {
    var pointX = 0;
    if (this.layout === 1) {
      this.chart.bufferArea.textBaseline = 'top';
      this.chart.bufferArea.textAlign = 'left';
      this.chart.bufferArea.fillStyle = CanvasChartStyle.title_color;
      this.chart.bufferArea.font = VicsFont.getFont(12, "bold");
      this.chart.bufferArea.fillText(this.chart.title, 12, 12);
      
      pointX = this.chart.bufferArea.measureText(this.chart.title).width + 12 + 10;
      if (this.chart.legends) {
        this.chart.bufferArea.font = VicsFont.getFont(11);
        for (i = 0; i < this.chart.legends.length; i++) {
          if (this.chart.colors[i] instanceof Array) {
            this.chart.bufferArea.fillStyle = this.chart.colors[i][0];
          } else {
            this.chart.bufferArea.fillStyle = this.chart.colors[i];
          }
          
          this.chart.bufferArea.fillRect(pointX, 15, 8, 8);
          pointX += 12;
          
          this.chart.bufferArea.fillStyle = CanvasChartStyle.title_color;
          this.chart.bufferArea.fillText(this.chart.legends[i], pointX, 13);
          pointX += this.chart.bufferArea.measureText(this.chart.legends[i]).width + 4;
        }
      }
    } else if (this.layout === 2) {
      this.chart.bufferArea.textBaseline = 'top';
      this.chart.bufferArea.textAlign = 'right';
      
      pointX = this.chart.width - 10;
      var legends = this.chart.legends;
      
      if (legends) {
        this.chart.bufferArea.font = VicsFont.getFont(11);
        for (var i = legends.length - 1; 0 <= i; i--) {
          
          this.chart.bufferArea.fillStyle = CanvasChartStyle.title_color;
          this.chart.bufferArea.fillText(legends[i], pointX, 23);
          pointX -= this.chart.bufferArea.measureText(legends[i]).width + 4;
          
          if (this.chart.colors[i] instanceof Array) {
            this.chart.bufferArea.fillStyle = this.chart.colors[i][0];
          } else {
            this.chart.bufferArea.fillStyle = this.chart.colors[i];
          }
          this.chart.bufferArea.fillRect(pointX - 6, 25, 8, 8);
          pointX -= 12;
        }
      }
      
    }
    
  }
};