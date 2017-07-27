<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->increments('id');
            $table->string('shop_name');
            $table->string('lat');
            $table->string('lng');
            $table->boolean('is_approved')->default(false);
            $table->integer('user_id')->foreign()
                ->references('id')->on('users')->nullable();
            $table->timestamps();
        });

        Schema::create('user_has_shops', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('shop_id')->foreign()
                ->references('id')->on('shops')->nullable();
            $table->integer('user_id')->foreign()
                ->references('id')->on('users')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shops');
        Schema::dropIfExists('user_has_shops');
    }
}
