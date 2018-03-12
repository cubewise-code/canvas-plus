<div ng-init="page.titles.month='Year'" ng-controller="${pageNameClean}Ctrl">

    <div class="row">
        <div class="col-md-6">
            <h1><i class="fa fa-line-chart"></i> ${pageName}</h1>
        </div>
        <div class="col-md-3" style="margin-top: 20px;">
            Department Selection
        </div>
        <div class="col-md-3 text-right" style="margin-top: 20px;">
            <div class="btn-group" role="group" style="width: 100%;" >
                <button class="btn btn-default" ng-class="{'active': page.titles.month=='Mar'}" style="width: 20%;" ng-click="page.titles.month='Mar'">Q1</button>
                <button class="btn btn-default" ng-class="{'active': page.titles.month=='Jun'}" style="width: 20%;" ng-click="page.titles.month='Jun'">Q2</button>
                <button class="btn btn-default" ng-class="{'active': page.titles.month=='Sep'}" style="width: 20%;" ng-click="page.titles.month='Sep'">Q3</button>
                <button class="btn btn-default" ng-class="{'active': page.titles.month=='Dec'}" style="width: 20%;" ng-click="page.titles.month='Dec'">Q4</button>
                <button class="btn btn-default" ng-class="{'active': page.titles.month=='Year'}" style="width: 20%;" ng-click="page.titles.month='Year'">Year</button>
            </div>
        </div>
        
    </div>

    <div class="row">
        <div class="col-md-3">
        </div>
    </div>

    <div class="row">

      <div class="col-md-3">
          <div class="panel panel-default">
              <div class="panel-heading" style="font-size: 3em;">
                  Value
                  <div class="row">
                      <div class="col-md-12" style="font-size: 0.5em;">Operating Profit</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-md-3">
          <div class="panel panel-info">
              <div class="panel-heading" style="font-size: 3em;">
                  Value
                  <div class="row">
                      <div class="col-md-12" style="font-size: 0.5em;">Gross Margin</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-md-3">
          <div class="panel panel-warning">
              <div class="panel-heading" style="font-size: 3em;">
                  Value
                  <div class="row">
                      <div class="col-md-12" style="font-size: 0.5em;">Net Sales</div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-md-3">
          <div class="panel panel-danger">
              <div class="panel-heading" style="font-size: 3em;">
                  Value
                  <div class="row">
                      <div class="col-md-12" style="font-size: 0.5em;">Operating Expenses</div>
                  </div>
              </div>
          </div>
      </div>

    </div>

    <div class="row">

      <div class="col-md-6">
          <div class="panel panel-primary">
              <div class="panel-heading">
                  Table
              </div>
              <div class="panel-body">
                  <table class="table table-striped">
                      <tr>
                          <th>Region</th>
                          <th>Operating Profit</th>
                          <th>Gross Margin</th>
                          <th>Net Sales</th>
                          <th>Operating Expenses</th>
                          <th>Calculation</th>
                          <th>Traffic Lights</th>
                      </tr>
                      <tr>
                          <td>
                            
                          </td>
                          <td>
                            
                          </td>
                          <td>
                            
                          </td>
                          <td>
                            
                          </td>
                          <td>
                            
                          </td>
                          <td>
                            
                          </td>
                          <td>
                            
                          </td>
                      </tr>
                  </table>
              </div>
          </div>
      </div>
      
      <div class="col-md-6">
          <div class="panel panel-primary">
              <div class="panel-heading">
                  Chart
              </div>
              <div class="panel-body">

              </div>
          </div>
      </div>

    </div>
</div>