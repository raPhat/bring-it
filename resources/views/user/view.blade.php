@extends('layouts.panel')

@section('panel-heading')
<a href="/home">Dashboard</a> / <a href="/user-management">User management</a> / User detail
@endsection

@section('panel-body')
<div class="user-management--container">
    <div id="user-detail"></div>
</div>
@endsection
