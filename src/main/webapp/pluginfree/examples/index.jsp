<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"
%><%@page import="java.util.Date"
%><%@page import="java.text.SimpleDateFormat"
%><%@page import="java.io.ByteArrayOutputStream"
%><%@page import="java.io.OutputStreamWriter"
%><%@page import="java.nio.charset.Charset"
%><%
SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmssSSS");
String now = format.format(new Date());

request.setCharacterEncoding("utf-8");
response.setCharacterEncoding("utf-8");
response.setContentType("text/html; charset=utf-8");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>nProtect Online Security v1.0.0</title>
<style>
body,td, th{font-size:10pt}
input, textarea{font-size:9pt;}
</style>

<script type="text/javascript" src="/innogrid/pluginfree/js/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="/innogrid/pluginfree/js/nppfs-1.13.0.js?dummy=<%= now %>" charset="utf-8"></script>

<script type="text/javascript">
jQuery(document).ready(function(){	
	jQuery("#userAgent").text(navigator.userAgent);

//	uV.dV.dk = ad.jt; // Debug
	
	npPfsCtrl.isInstall({
		success : function(){
			npPfsCtrl.hideLoading();
			$("#nos-install").html("설치됨");
			//alert("보안프로그램이 설치되어 있습니다.");
		},
		fail : function(){
			npPfsCtrl.hideLoading();
			//alert("보안프로그램의 설치가 필요합니다.");
		}
	});

	
	/*
	npPfsStartup(document.form1, false, true, true, "enc", "on");
	1. form 양식 : 기본값 DOM Document 상의 첫번째 form
	2. 개인방화벽 사용여부 : 기본값 false
	3. 키보드보안 사용여부 : 기본값 false
	4. 단말정보수집 사용여부 : 기본값 false
	5. 키보드보안 E2E 필드 설정 속성명 : 기본값 "enc"
	6. 키보드보안 E2E 필드 설정 속성값: 기본값 "on"
	부가적인 설정은(예, 설치확인 등) /pluginfree/js/nppfs-1.0.0.js를 수정하여 설정하십시오.
*/
/*
	npPfsStartup(
		document.form2
		, true
		, true
		, true
		, "npkencrypt"
		, "on"
	);
*/
	//URL Rewriting : Cookie가 허용되지 않는 브라우저에서는 다음 구문을 추가하여 쿠키없이도 동작이 가능하도록 처리
	uV.dV.Gf = "<%= response.encodeURL("/innogrid/pluginfree/jsp/nppfs.key.jsp") %>";    // 키발급 경로 (nppfs-1.13.0.js 14 라인의 Gf 변수에서도 설정 가능 )
	uV.dV.Fz = "<%= response.encodeURL("/innogrid/pluginfree/jsp/nppfs.install.jsp") %>"; // 설치안내 페이지


	npPfsStartup(document.form1, true, true, false, false, "npkencrypt", "on");
});


function decryptKeyCryptData() {
		document.form1.submit();
}

</script>

</head>

<body>
<%!
private String getDefaultCharSet() {
	OutputStreamWriter writer = new OutputStreamWriter(new ByteArrayOutputStream());
	String enc = writer.getEncoding();
	return enc;
}

%>
<!--   from submit 기반으로 동작하므로, 키보드 보안이 적용된 필드는 반드시 form 안에 포함이 되어있어야 함 -->
<form name="form1" action="<%= response.encodeURL("decrypt.jsp") %>" method="post" target="resultTarget">
<div id="nppfs-loading-modal" style="display:none;"></div>

	<input type="hidden" name="mode" value="KEYCRYPT" />
	<table width="100%">
		<colgroup>
			<col width="10%"></col>
			<col width="90%"></col>
		</colgroup>
		<tr>
			<th colspan="2" style="text-align:left;font-size:14pt;">키보드보안 테스트</th>
		</tr>
		<tr>
			<td> 미보호 </td>
			<td> <input type="text"     name="NONE_TEXT_2" id="n2" value="" npkencrypt="off" /></td>
		</tr>
		<tr>
			<td> FormOut ID </td>
			<td> <input type="text"     name="NONE_TEXT_4" id="t4" value=""></td>
		</tr>
		<tr>
			<td> FormOut PW </td>
			<td> <input type="password" name="NONE_PASS_4" id="p4" value=""></td>
		</tr>
		<!-- E2E 입력필드는 name 기반으로 복호화가 이루어지므로 name이 꼭 필요하며 name 중복 시 복호화 오류가 발생할 수 있음 -->
		<tr>
			<td>E2E Id(Inca):</td>
			<td><input type="text"     name="E2E_TEXT_1" id="t1"  npkencrypt="on" value="" maxlength="14" /> : 14글자</td>
		</tr>
		<tr>
			<td>E2E PW(Inca):</td>
			<td><input type="password" name="E2E_PASS_1" id="p1"  npkencrypt="on" value="" maxlength="16" /> : 16글자</td>
		</tr>
		
		<tr>
			<td colspan="2">
				<input type="button" name="getClientKey" id="getClientKey" value="복호화" onclick="decryptKeyCryptData();">
			</td>
		</tr>
	</table>
</form>
</div>


<div style="margin-bottom:20px; padding:10px; border:1px solid #000;">
	<table width="100%">
	 	<tr>
	 		<th style="text-align:left;font-size:14pt;"> 복호화 테스트</th>
	 	</tr>
		<tr>
			<td>
	<iframe id="resultTarget" name="resultTarget" src="about:blank" style="border:0px solid #000;width:100%;height:300px;"></iframe>
			</td>
		</tr>
	</table>
</div>

</body>
</html>
