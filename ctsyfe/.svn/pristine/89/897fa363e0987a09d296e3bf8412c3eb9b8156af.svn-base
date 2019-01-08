angular.module('starter.FuYouJianKangControllers', ['ionic'])
/**
 * 儿童免疫
 */
.controller('ertongmianyi', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation) {
    XywyService.getRem(750);

    //判断手机类型
    $scope.isIos = false;
    if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        $scope.isIos = true;
    }

    //返回上一页
    $scope.goBack = function () {
        $window.history.back();
    };
    //首页
    $scope.back = function () {
        var openid = sessionStorage.getItem("openId");
        $ionicViewSwitcher.nextDirection('back');
        var token = sessionStorage.getItem("token");
        $state.go("shouye", { openid: openid, token: token });
    };
    
    $scope.ertongmianyi=[{title:"乙肝疫苗",jzdx:"0、1、6月龄",cishu:"3次",tujing:"肌内注射",beizhu:"出生后24小时内接种第1剂次，第1、2剂次间隔≥28天"},
                         {title:"卡介苗",jzdx:"出生时",cishu:"1次",tujing:"皮内注射",beizhu:"接种后2周局部出现红肿浸润，8～12周后形成小溃疡，随后结痂"},
                         {title:"脊灰疫苗",jzdx:"2、3、4月龄，4周岁",cishu:"4次",tujing:"口服",beizhu:"第1、2剂次，第2、3剂次间隔均≥28天"},
                         {title:"百白破疫苗",jzdx:"3、4、5月龄，18～24月龄",cishu:"4次",tujing:"肌内注射",beizhu:"第1、2剂次，第2、3剂次间隔均≥28天"},
                         {title:"白破疫苗",jzdx:"6周岁",cishu:"1次",tujing:"肌内注射"},
                         {title:"麻风疫苗（麻疹、风疹疫苗）",jzdx:"8月龄",cishu:"1次",tujing:"皮下注射"},
                         {title:"麻腮风疫苗（麻疹、腮腺炎、风疹疫苗）",jzdx:"18～24月龄",cishu:"1次",tujing:"皮下注射"},
                         {title:"乙脑减毒活疫苗",jzdx:"8月龄，2周岁",cishu:"2次",tujing:"皮下注射"},
                         {title:"A群流脑疫苗",jzdx:"6～18月龄",cishu:"2次",tujing:"皮下注射",beizhu:"第1、2剂次间隔3个月"},
                         {title:"A+C流脑疫苗",jzdx:"3周岁，6周岁",cishu:"2次",tujing:"皮下注射",beizhu:"2剂次间隔≥3年；第一剂次与A群流脑疫苗第2剂次间隔≥12个月"},
                         {title:"甲肝减毒活疫苗",jzdx:"18月龄",cishu:"1次",tujing:"皮下注射",},
                         {title:"乙脑灭活疫苗",jzdx:"8月龄（2剂次），2周岁，6周岁",cishu:"4次",tujing:"皮下注射",beizhu:"第1、2剂次间隔7～10天"},
                         {title:"甲肝灭活疫苗",jzdx:"18月龄，24～30月龄",cishu:"2次",tujing:"肌内注射",beizhu:"2剂次间隔≥6个月"},
                         {title:"免疫接种禁忌症",text:" 1、患有皮炎、化脓性皮肤病、严重湿疹的孩子不宜接种，等病愈合方可进行接种。"
                        	 +"\n\n2、体温超过37.5，有腋下淋巴结肿大的孩子不宜接种，应查明病因治愈后再接种。"
                        	 +"\n\n3、患有严重心、肝、肾疾病和活动性结核病的孩子不宜接种。"
                        	 +"\n\n4、神经系统发育不正常，有脑炎后遗症、癫痫病的孩子不宜接种。"
                        	 +"\n\n5、严重营养不良，严重佝偻病、先天性免疫缺陷的孩子不宜接种。"
                        	 +"\n\n6、有哮喘、荨麻疹等过敏体质的孩子不宜接种。"
                        	 +"\n\n7、如果孩子每天大便次数超过4次，须待恢复两周后，才可服用脊灰疫苗。"
                        	 +"\n\n8、最近注射过多价免疫球蛋白的孩子，6周内不应接种麻疹疫苗。"
                        	 +"\n\n9、感冒、轻度低热等一般性疾病视情况可暂缓接种。"},
                    	 {title:"常见接种反应及处置原则",text:" 1、预防接种的一般反应指在预防接种后发生、由疫苗本身所固有的特性引起、对机体只会造成一过性生理功能障碍的反应。反应主要出现发热和局部红肿，同时可能伴有全身不适、倦怠、食欲缺乏、乏力等综合症状。"
								+"\n\n2、全身反应，发热、头痛、眩晕、恶寒、乏力和周身不适等。"
								+"\n\n治疗：发生全身反应需加强观察，一般不需任何处理，必要时适当休息，多喝开水，注意保暖，防止继发其他疾病。全身反应严重者可对症处理。高热不退或伴有其他并发症者，应及时就诊。"
								+"\n\n3、局部反应"
								+"\n注射局部红肿浸润，一般不需任何处理。"}
                         ];
    
    $scope.isshowall = function (event,ionimg) {
    	var parent;
    	//用于判断用户是否点击了展开小图标
    	if(ionimg=="ionimg"){
    		parent=event.target.parentElement.parentElement;
    		event.stopPropagation();
    	}else{
    		parent = event.target.parentElement;
    	}
    	
//        var parent = event.target.parentElement;

        var groundPa = parent.parentElement.querySelectorAll("div");
        for (var i = 0; i < groundPa.length; i++) {
            var par_borther = groundPa[i];
            if (parent == par_borther) {
                continue;
            }
            var par_ul = par_borther.querySelector('ul');
//            var par_p = par_borther.querySelector('p');
            var par_span = par_borther.querySelector('span');
            if (par_ul) {
                par_ul.className = "hide";
//                if(par_p){
//                	 par_p.className = "hide";
//                }
                if(par_span){
                	par_span.className = "icon ion-chevron-right activated";
               }
                
            }
        }

        var ul = parent.querySelector('ul');
//        var p = parent.querySelector('p');
        var span = parent.querySelector('span');
        if (ul) {
            if (ul.className == "hide") {
                ul.className = "";
//                p.className = "tz-desc";
                span.className = "icon ion-chevron-down activated";
            }
            else {
                ul.className = "hide";
//                p.className = "hide";
                span.className = "icon ion-chevron-right activated";
            }
        }
        if (parent) {
            var pos = parent.offsetTop;
            $("#tzpg").animate({ scrollTop: pos }, 100);
        }
    };

})
/**
 * 孕期
 */
.controller('yunqi', function (wxApi, $ionicViewSwitcher, $scope, $http, $state, $stateParams, $timeout, XywyService, Popup, Outlet, $ionicScrollDelegate, audioControl, $window, $rootScope, geoLocation) {
    XywyService.getRem(750);

    //判断手机类型
    $scope.isIos = false;
    if (!!$window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        $scope.isIos = true;
    }

    //返回上一页
    $scope.goBack = function () {
        $window.history.back();
    };
    //首页
    $scope.back = function () {
        var openid = sessionStorage.getItem("openId");
        $ionicViewSwitcher.nextDirection('back');
        var token = sessionStorage.getItem("token");
        $state.go("shouye", { openid: openid, token: token });
    };
    $scope.yunjian=[{title:"第1次产检",time:"怀孕12周",shuoming:"准妈妈在孕期第12周时正式开始进行第1次产检。一般医院会给妈妈们办理\"孕妇健康手册\"。日后医师为每位准妈妈做各项产检时，也会依据手册内记载的检查项目分别进行并做记录。"},
                    {title:"第2次产检",time:"怀孕13-16周",shuoming:"准妈妈要做第2次产检。除基本的例行检查外，准妈妈在16周以上，可抽血做唐氏综合征筛检，并看第1次产检的抽血报告。16~20周开始进行羊膜穿刺，主要是看胎儿的染色体异常与否。"},
                    {title:"第3次产检",time:"怀孕17-20周",shuoming:"准妈妈要做第3次产检。在孕期20周做超声波检查，主要是看胎儿外观发育上是否有较大问题，医师会仔细量胎儿的头围、腹围、看大腿骨长度及检视脊柱是否有先天性异常。"},
                    {title:"第4次产检",time:"怀孕21-24周",shuoming:"准妈妈要做第4次产检。大部分妊娠糖尿病的筛检，是在孕期第24周做。如准妈妈有妊娠糖尿病，在治疗上，要采取饮食调整，如果调整饮食后还不能将餐后血糖控制在理想范围，则需通过注射胰岛素来控制，孕期不能使用口服的降血糖药物来治疗，以免造成胎儿畸形。"},
                    {title:"第5次产检",time:"怀孕25-28周",shuoming:"准妈妈要做第5次产检。此阶段最重要的是为准妈妈抽血检查乙型肝炎，目的是要检视准妈妈本身是否携带乙型肝炎病毒，如果准妈妈的乙型肝炎两项检验皆呈阳性反应，一定要在准妈妈生下胎儿24小时内，为新生儿注射疫苗，以免让新生儿遭受感染。此外，要再次确认准妈妈前次所做的梅毒反应，是呈阳性还是阴性反应。如此方能在胎儿未出生前，即为准妈妈彻底治疗梅毒。"},
                    {title:"第6次产检",time:"怀孕29-32周",shuoming:"准妈妈要做第6次产检。医师要陆续为准妈妈检查是否有水肿现象。由于大部分的子痫前症，会在孕期28周以后发生，如果测量结果发现准妈妈的血压偏高，又出现蛋白尿、全身水肿等情况时，准妈妈须多加留意，以免有子痫前症的危险。另外，准妈妈在37周前，要特别预防早产的发生，如果阵痛超过 30分钟以上且持续增加，又合并有阴道出血或出水现象时，一定要立即送医院检查。"},
                    {title:"第7次产检",time:"怀孕33-35周",shuoming:"准妈妈要做第7次产检。到了孕期34周时，准妈妈要做一次详细的超声波检查，以评估胎儿当时的体重及发育状况，并预估胎儿至足月生产时的重量。一旦发现胎儿体重不足，准妈妈就应多补充一些营养素;若发现胎儿过重，准妈妈在饮食上就要稍加控制，以免日后需要剖宫生产，或在生产过程中出现胎儿难产情形。从33周开始，产检应变为每周一次，每次检查的内容没有明显的变化，如:测量体重、宫高、腹围、心率、血压、胎心，定期测量血尿常规等项目。不同的是，我们要开始做胎心监护了。"},
                    {title:"第8次产检",time:"怀孕36周",shuoming:"从36周开始，准妈妈愈来愈接近生产日期，此时所做的产检，以每周检查1次为原则，并持续监视胎儿的状态。"},
                    {title:"第9次产检",time:"怀孕37周",shuoming:"37周进行第9次产检。由于胎动愈来愈频繁，准妈妈宜随时注意胎儿及自身的情况，以免胎儿提前出生。"},
                    {title:"第10次产检",time:"怀孕38周",shuoming:"从38周开始，胎位开始固定，胎头已经下来，并卡在骨盆腔内，此时准妈妈应有随时准备生产的心理。有的准妈妈到了42周以后，仍没有生产迹象，就应考虑让医师使用催产素。"},
                         ];
    
    $scope.isshowall = function (event,ionimg) {
    	var parent;
    	//用于判断用户是否点击了展开小图标
    	if(ionimg=="ionimg"){
    		parent=event.target.parentElement.parentElement;
    		event.stopPropagation();
    	}else{
    		parent = event.target.parentElement;
    	}
//        var parent = event.target.parentElement;

        var groundPa = parent.parentElement.querySelectorAll("div");
        for (var i = 0; i < groundPa.length; i++) {
            var par_borther = groundPa[i];
            if (parent == par_borther) {
                continue;
            }
            var par_ul = par_borther.querySelector('ul');
//            var par_p = par_borther.querySelector('p');
            var par_span = par_borther.querySelector('span');
            if (par_ul) {
                par_ul.className = "hide";
//                if(par_p){
//                	 par_p.className = "hide";
//                }
                if(par_span){
                	par_span.className = "icon ion-chevron-right activated";
               }
                
            }
        }

        var ul = parent.querySelector('ul');
//        var p = parent.querySelector('p');
        var span = parent.querySelector('span');
        if (ul) {
            if (ul.className == "hide") {
                ul.className = "";
//                p.className = "tz-desc";
                span.className = "icon ion-chevron-down activated";
            }
            else {
                ul.className = "hide";
//                p.className = "hide";
                span.className = "icon ion-chevron-right activated";
            }
        }
        if (parent) {
            var pos = parent.offsetTop;
            $("#tzpg").animate({ scrollTop: pos }, 100);
        }
    };

})