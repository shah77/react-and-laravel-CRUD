<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Task::all();
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $task = new Task();
        $task->name = $request->get('taskName');
        $task->percentage = $request->get('taskPercentage');
        $task->createdBy = $request->get('taskBy');
        $task->description = $request->get('taskDesc');
        $task->dueDate = date("Y-m-d", strtotime($request->taskDate));
        $task->startDate = date("Y-m-d", strtotime($request->taskStartDate));
        $task->assignedTo = $request->get('taskTo');
        $task->save();

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::find($id);
        return $task;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $task = Task::find($id);
        return $task;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $task->name = $request->taskName;
        $task->percentage = $request->taskPercentage;
        $task->createdBy = $request->taskBy;
        $task->description = $request->taskDesc;
        $task->dueDate = date("Y-m-d", strtotime($request->taskDate));
        $task->startDate = date("Y-m-d", strtotime($request->taskStartDate));
        $task->assignedTo = $request->taskTo;
        $task->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
    }
}
