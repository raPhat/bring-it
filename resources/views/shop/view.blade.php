@extends('layouts.panel')

@section('panel-heading')
<a href="/home">Dashboard</a> / <a href="/shop-management">Shop management</a> / Shop detail
@endsection

@section('panel-body')
<div class="shop-management--container">
    <div id="shop-detail"></div>
</div>
@endsection
