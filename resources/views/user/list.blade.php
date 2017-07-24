@extends('layouts.panel')

@section('panel-heading')
<a href="/home">Dashboard</a> / User management
@endsection

@section('panel-body')
<div class="user-management--container">
  <div class="text-right">
    <a href='/user-management/create' class="btn btn-success">
      <i class="fa fa-plus-circle"></i>
      Add new user
    </a>
  </div>
  <div class="user-management--table">
    <div id="table-users"></div>
  </div>
</div>
@endsection
