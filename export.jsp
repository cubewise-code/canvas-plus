<%@page import="org.apache.poi.hssf.usermodel.*" %><%@page import="com.cubewise.rest.api.pojo.ExportRequest"%><%@page import="java.io.*" %><%
	
	// get file/export info
	ExportRequest exportRequest = (ExportRequest)request.getSession(false).getAttribute("export");
	
	// Excel
	if(exportRequest.getOutput().trim().equalsIgnoreCase("excel")){
		HSSFWorkbook workbook = (HSSFWorkbook)request.getSession(false).getAttribute("export-excel");
		
		// write it as an excel attachment
		ByteArrayOutputStream outByteStream = new ByteArrayOutputStream();
		workbook.write(outByteStream);
		workbook.close();
		
		byte [] outArray = outByteStream.toByteArray();
		response.setContentType("application/ms-excel");
		response.setContentLength(outArray.length);
		response.setHeader("Expires:", "0"); // eliminates browser caching
		response.setHeader("Content-Disposition", "attachment; filename=" + exportRequest.getFile() + ".xls");
		OutputStream outStream = response.getOutputStream();
		outStream.write(outArray);
		outStream.flush();
		outStream.close();
	}
	else if(exportRequest.getOutput().trim().equalsIgnoreCase("csv")){
		StringBuffer sbCsv = (StringBuffer)request.getSession(false).getAttribute("export-csv");
		
		response.setContentType("text/csv");
		response.setHeader("Expires:", "0"); // eliminates browser caching
		response.setHeader("Content-Disposition", "attachment; filename=\"" + exportRequest.getFile() + ".csv\"");
		OutputStream outStream = response.getOutputStream();
		outStream.write(sbCsv.toString().getBytes());
		outStream.flush();
		outStream.close();
	}

	
	
	
%>