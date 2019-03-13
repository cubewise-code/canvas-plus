<%@page import="org.apache.poi.hssf.usermodel.*" %><%@page import="com.cubewise.rest.api.pojo.ExportRequest"%><%@page import="java.io.*" %><%

  try{      
      org.apache.log4j.Logger logger = org.apache.log4j.LogManager.getLogger("ExportService");
      
      // get file/export info
      ExportRequest exportRequest = (ExportRequest)request.getSession(false).getAttribute("export");
      request.getSession(false).setAttribute("export", null); // clear contents from session to prevent reuse
      logger.debug("exportRequest retrieved: " + exportRequest);
      
      if(exportRequest != null){
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
          else{
              response.setContentType("text/html");
              response.setHeader("Expires:", "0"); // eliminates browser caching
              OutputStream outStream = response.getOutputStream();
              outStream.write(("<h1>Unsupported Export Format - " + exportRequest.getOutput().trim() + "</h1>").getBytes());
              outStream.flush();
              outStream.close();
          }
      }
      else{
          response.setContentType("text/html");
          response.setHeader("Expires:", "0"); // eliminates browser caching
          OutputStream outStream = response.getOutputStream();
          outStream.write("<h1>Invalid Export.</h1>".getBytes());
          outStream.flush();
          outStream.close();
      }
  }
  catch(Exception ex){
      response.setContentType("text/html");
      response.setHeader("Expires:", "0"); // eliminates browser caching
      OutputStream outStream = response.getOutputStream();
      outStream.write("<h1>Error Exporting Contents. Check Logs.</h1>".getBytes());
      outStream.flush();
      outStream.close();
  }

%>