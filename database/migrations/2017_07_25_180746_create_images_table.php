<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->increments('id');
            $table->text('path');
            $table->timestamps();
        });

        Schema::create('shop_has_images', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('shop_id')->foreign()
                ->references('id')->on('shops')->nullable();
            $table->integer('image_id')->foreign()
                ->references('id')->on('images')->nullable();
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
        Schema::dropIfExists('images');
        Schema::dropIfExists('shop_has_images');
    }
}
