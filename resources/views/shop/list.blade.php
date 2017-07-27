@extends('layouts.panel')

@section('panel-heading')
<a href="/home">Dashboard</a> / Shop management
@endsection

@section('panel-body')
<div class="shop-management--container">
  <div class="shop-management--table">
    <div id="table-shops"></div>
  </div>
</div>
@endsection
